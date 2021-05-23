from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils import timezone
from django.conf import settings
from autoslug import AutoSlugField
from datetime import timedelta

# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=128,unique=True)
    views=models.IntegerField(default=0)
    likes=models.IntegerField(default=0)
    slug=models.SlugField(unique=True)
    required = models.BooleanField(null=True)
    def get_absolute_url(self):
        #return "/jqapp/category/%s/" %(self.slug)
        return reverse('TheApp:show_category', kwargs={'cslug': self.slug})
        #return reverse('TheApp:index')

    def save(self,*args,**kwargs):
        self.slug=slugify(self.name)
        super(Category,self).save(*args,**kwargs)

    class Meta:
        verbose_name_plural='Categories'
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    # This field is required.
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    # These fields are optional
    user_type = models.CharField(max_length=128,blank=True)
    def __str__(self):
        return self.user.username

class user_type(models.Model):
    name=models.CharField(max_length=128,unique=True)
    slug=models.SlugField(unique=True)
    def save(self,*args,**kwargs):
        self.slug=slugify(self.name)
        super(user_type,self).save(*args,**kwargs)
    def __str__(self):
        return self.name

class MenuItems(models.Model):
    name=models.CharField(max_length=128,unique=True)
    slug=models.SlugField(unique=True)
    url=models.CharField(max_length=128,unique=True)
    app = models.CharField(max_length=128,default='TheApp')
    authenticated_only=models.BooleanField(default=True)
    topbar_option= models.CharField(max_length=128,default='')
    def save(self,*args,**kwargs):
        self.slug=slugify(self.name)
        super(MenuItems,self).save(*args,**kwargs)
    def __str__(self):
        return self.name

class Film(models.Model):
    name=models.CharField(max_length=128,unique=True)
    slug=models.SlugField(unique=True)
    genre=models.CharField(max_length=128,null=True)
    language=models.CharField(max_length=128,default='English')
    def get_absolute_url(self):
        return reverse('TheApp:show_film', kwargs={'slug': self.slug})

    def save(self,*args,**kwargs):
        self.slug=slugify(self.name)
        super(Film,self).save(*args,**kwargs)

    def __str__(self):
        return self.name

class FilmGenre(models.Model):
    name=models.CharField(max_length=128,unique=True)
    slug=models.SlugField(unique=True)
    def save(self,*args,**kwargs):
        self.slug=slugify(self.name)
        super(FilmGenre,self).save(*args,**kwargs)
    def __str__(self):
        return self.name

class Language(models.Model):
    name=models.CharField(max_length=128,unique=True)
    slug=models.SlugField(unique=True)
    def save(self,*args,**kwargs):
        self.slug=slugify(self.name)
        super(Language,self).save(*args,**kwargs)
    def __str__(self):
        return self.name

class Message(models.Model):
    name=models.CharField(max_length=128)
    userPk=models.IntegerField()
    date=models.DateField(default=timezone.now)
    text=models.TextField()
    email=models.EmailField()

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    likes=models.IntegerField(default=0)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    #slug = AutoSlugField(null=True, default=None, unique=True, populate_from='name')

    #def save(self,*args,**kwargs):
    #    self.slug=slugify(self.name)
    #    super(Product,self).save(*args,**kwargs)
    def __str__(self):
        return self.name

class ProductStock(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    stock_available=models.IntegerField(default=0)
    stock_reserved_by_customer_order=models.IntegerField(default=0)
    stock_awaiting_delivery_from_supplier=models.IntegerField(default=0)
    def __str__(self):
        return str(self.product)

class ProductPriceMaster(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price=models.DecimalField(default=0.01, max_digits=5, decimal_places=2)
    start_date=models.DateField(default=timezone.now)
    end_date=models.DateField(default=timezone.now)
    class Meta:
        abstract = True
    def __str__(self):
        return str(self.product)

class ProductPrice(ProductPriceMaster):
    pass

class ProductPriceMinQtyPromotion(ProductPriceMaster):
    min_order_qty = models.IntegerField(default=0)
    create_date=models.DateField(default=timezone.now)

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    create_date=models.DateField(default=timezone.now)
    delivery_date=models.DateField(null=True)

class OrderProduct(models.Model):
    order= models.ForeignKey(Order, on_delete=models.CASCADE)
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    order_qty=models.IntegerField(default=0)
    order_delivered_qty=models.IntegerField(default=0)
    order_product_price=models.DecimalField(default=0.00, max_digits=5, decimal_places=2)
    create_date = models.DateField(default=timezone.now)


class CartHeader(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    create_date=models.DateField(default=timezone.now)

class CartLine(models.Model):
    cartheader= models.ForeignKey(CartHeader, on_delete=models.CASCADE)
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    order_qty=models.IntegerField(default=0)
    order_product_price=models.DecimalField(default=0.00, max_digits=5, decimal_places=2)

class Album(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Track(models.Model):
    album = models.ForeignKey('Album',on_delete=models.CASCADE)
    number = models.IntegerField()
    name = models.CharField(max_length=100)
    create_date=models.DateField(default=timezone.now)

    def __str__(self):
        return "%s - %s" %( self.number, self.name)

class Config(models.Model):
    name = models.CharField(max_length=100)
    detail = models.TextField(max_length=5000)
    slug=models.SlugField(unique=True,default="")

    def save(self,*args,**kwargs):
        self.slug=slugify(self.name)
        super(Config,self).save(*args,**kwargs)
    def __str__(self):
        return self.name
