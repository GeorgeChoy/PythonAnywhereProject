from django import forms
from .models import  *
from django.forms import formset_factory,ModelForm, inlineformset_factory,BaseFormSet,CheckboxInput,\
    modelformset_factory,BaseInlineFormSet,DecimalField
from django.forms.widgets import DateInput
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import date,datetime
import decimal
class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ('name','required')
        widgets = {'required': forms.CheckboxInput(attrs={'id':'required'}),}

def populate_USER_TYPE_CHOICES():
    USER_TYPE_CHOICES = []
    user_type_list = user_type.objects.all()
    for ut1 in user_type_list:
        USER_TYPE_CHOICES.append((ut1.name,ut1.name))
    return USER_TYPE_CHOICES

class UserForm(forms.ModelForm):
    populate_USER_TYPE_CHOICES()
    password = forms.CharField(widget=forms.PasswordInput())
    class Meta:
        model = User
        fields = ["username",  "password","email"]

class UserProfileForm(forms.ModelForm):
    USER_TYPE_CHOICES = []
    USER_TYPE_CHOICES=populate_USER_TYPE_CHOICES()
    user_type= forms.CharField(label='User type', widget=forms.Select(choices=USER_TYPE_CHOICES))
    class Meta:
        model = UserProfile
        fields = ["user_type",]

def populate_film_genres():
    film_genre_CHOICES = []
    film_genres_list = FilmGenre.objects.all()
    for f1 in film_genres_list:
        film_genre_CHOICES.append((f1.name,f1.name))
    return film_genre_CHOICES

def populate_languages():
    language_CHOICES = []
    language_list = Language.objects.all()
    for f1 in language_list:
        language_CHOICES.append((f1.name,f1.name))
    return language_CHOICES

class FilmForm(ModelForm):
    Genre_CHOICES = []
    Genre_CHOICES=populate_film_genres()
    language_CHOICES = []
    language_CHOICES =populate_languages()
    genre=forms.CharField(label='genre', widget=forms.Select(choices=Genre_CHOICES))
    language = forms.ChoiceField(widget=forms.RadioSelect, choices=language_CHOICES)
    class Meta:
        model = Film
        fields = ('name','genre','language')

class FilmGenreForm(ModelForm):
    class Meta:
        model = FilmGenre
        fields = ('name',)

class LanguageForm(ModelForm):
    class Meta:
        model = Language
        fields = ('name',)

class InputForm(forms.Form):
    input_text = forms.CharField (max_length=128, help_text="Please enter message to encrypt" )
    config_text = forms.CharField(max_length=128, help_text="Please enter 3 letter rotor config")

class MessageForm(ModelForm):
    name=forms.CharField (max_length=128 )

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super(MessageForm, self).__init__(*args, **kwargs)

    class Meta:
        model = Message
        fields = ('name','email','text',)

def populate_Categories():
    Categories = []
    category_list = Category.objects.all()
    for c1 in category_list:
        Categories.append((c1.name,c1.name))
    return Categories

class ProductForm(forms.ModelForm):
#use forms.ModelChoiceField to have the foreign key data in a drop down list
    category= forms.ModelChoiceField(queryset=Category.objects.all())
    class Meta:
        model = Product
        fields = ["name","category"]


#form for the product price table to be used in the formset ProductPriceFormSet2, it has a clean method to validate that start date is before end date
class ProductPriceForm(ModelForm):
    class Meta:
        model = ProductPrice
        #exclude = ()
        fields = ["product","price","start_date","end_date"]
        #price=forms.DecimalField(widget=forms.NumberInput())

    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data

    def clean_end_date(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get("start_date")
        end_date = cleaned_data.get("end_date")

        if end_date <= start_date  :
            raise ValidationError("End date must be after start date")
        else:
            return  end_date

    def clean_price(self):
        cleaned_data = super().clean()
        price = decimal.Decimal(self.cleaned_data.get("price"))

        if price <= 0.0  :
            raise ValidationError("0 price not allowed, check the delete box if you don't want this price")
        else:
            return  price

#    def has_changed(self):
#        changed_list = self.changed_data
#        print(changed_list)

ProductPriceWidgets={
                        'start_date':forms.DateInput(attrs={'type': 'date','class':'datepicker'}),
                        'end_date':forms.DateInput(attrs={'type': 'date','class':'datepicker'}),
                    }

class ProductStockForm(ModelForm):
    class Meta:
        model = ProductStock
        exclude = ()

#over ride the has_changed method to return True by default if you want the form's default values to be saved without user update.
    def has_changed(self):
        return True

ProductStockInitial={
                        'stock_available':5,
                        'stock_reserved_by_customer_order':5,
                        'stock_awaiting_delivery_from_supplier':6
                    }

ProductStockFormInstance=ProductStockForm(ProductStockInitial)

ProductStockFormSet = inlineformset_factory(Product, ProductStock, #fields = ['product', 'stock_available', 'stock_reserved_by_customer_order','stock_awaiting_delivery_from_supplier'],
                        can_delete = False,
                        exclude = [],
                        form=ProductStockForm)

ProductPriceFormSet = inlineformset_factory(Product, ProductPrice, fields = ['product', 'price','start_date','end_date'],
                                            widgets=ProductPriceWidgets,
                                            extra=1,
                                            form=ProductPriceForm,
                                            exclude = [], can_delete = True
                                            )

def dynamicProductPriceFormSet(extraField):
    return inlineformset_factory(Product, ProductPrice, fields = ['product', 'price','start_date','end_date'],
                                            widgets=ProductPriceWidgets,
                                            extra=extraField,
                                            form=ProductPriceForm,
                                            exclude = [], can_delete = True
                                            )

class ProductPriceMinQtyPromotionForm(ModelForm):
    class Meta:
        model = ProductPriceMinQtyPromotion
        exclude = ()

    def has_changed(self):
        return True

    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data

    def clean_end_date(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get("start_date")
        end_date = cleaned_data.get("end_date")

        if end_date <= start_date  :
            raise ValidationError("End date must be after start date")
        else:
            return  end_date

    def clean_min_order_qty(self):
        print("clean_min_order_qty")
        cleaned_data=super().clean()
        min_order_qty = cleaned_data.get("min_order_qty")
        price = cleaned_data.get("price")
        if min_order_qty <= 0.0 and price > 0:
            raise ValidationError("minimum quantity must not be zero when price is above zero")
        return min_order_qty

    #def clean(self):
    #    print("clean()")
    #    #cleaned_data=super(ProductPriceMinQtyPromotionForm,self).clean()
    #    cleaned_data=super().clean()
    #    min_order_qty = cleaned_data.get("min_order_qty")
    #    price = cleaned_data.get("price")
    #    start_date = cleaned_data.get("start_date")
    #    end_date = cleaned_data.get("end_date")
    #    print("clean_min_order_qty+"+str(min_order_qty)+" "+str(price))
    #    if min_order_qty <= 0 and price > 0:
    #        raise ValidationError("minimum quantity must not be zero when price is above zero")
    #    else:
    #        if end_date <= start_date:
    #            raise ValidationError("End date must be after start date")
    #    return cleaned_data

class CartHeaderForm(ModelForm):
    class Meta:
        model = CartHeader
        fields = ['create_date']

    def __init__(self, *args, **kwargs):
        super(CartHeaderForm, self).__init__(*args, **kwargs)
        instance = getattr(self, 'instance', None)
        if instance and instance.id:
            self.fields['create_date'].required = False
            self.fields['create_date'].widget.attrs['disabled'] = 'disabled'

class CartLineForm(ModelForm):
    class Meta:
        model = CartLine
        exclude = ()

    def __init__(self, *args, **kwargs):
        super(CartLineForm, self).__init__(*args, **kwargs)
        instance = getattr(self, 'instance', None)
        if instance and instance.id:
            self.fields['product'].required = False
            self.fields['product'].widget.attrs['disabled'] = 'disabled'

    def clean_product(self):
        # As shown in the above answer.
        instance = getattr(self, 'instance', None)
        if instance:
            return instance.product
        else:
            return self.cleaned_data.get('product', None)

#CartLineFormset = formset_factory(form=CartLineForm,extra=0,can_delete=True)
CartLineFormset = inlineformset_factory(CartHeader, CartLine, fields = ['product', 'order_qty','order_product_price'],
                                            extra=0,
                                            form=CartLineForm,
                                            exclude = [], can_delete = True
                                            )

OrderDeliveryDateWidget={
                        'delivery_date':forms.DateInput(attrs={'type': 'date','class':'datepicker'}),
                    }


class OrderHeaderForm(ModelForm):
    class Meta:
        model = Order
        fields = ['delivery_date']
        widgets = {
            'delivery_date': DateInput(attrs={'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        super(OrderHeaderForm, self).__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data

    def clean_delivery_date(self):
        cleaned_data = super().clean()
        delivery_date = cleaned_data.get("delivery_date")

        today = datetime.now().date()
        if delivery_date <= today  :
            raise ValidationError("Delivery date must be after today")
        else:
            return delivery_date

class CustomInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        # example custom validation across forms in the formset
        for form in self.forms:
            # your custom formset validation
            min_order_qty = form.cleaned_data['min_order_qty']
            if min_order_qty <= 0:
                print("validation error")
                msg = "min order qty must be more than 0"
                raise forms.ValidationError(msg, "error")

ProductPriceMinQtyPromotionFormSet = inlineformset_factory(Product, ProductPriceMinQtyPromotion,
                                            fields = ['product', 'price','min_order_qty','start_date','end_date'],
                                            widgets=ProductPriceWidgets,
                                            exclude = [], can_delete = True,extra=0,
                                            form=ProductPriceMinQtyPromotionForm)

#ProductPriceFormSet2 uses form ProductPriceForm so that you can validate that start date is before end date.
ProductPriceFormSet2 = inlineformset_factory( Product,ProductPrice,
                                            form=ProductPriceForm,
                                            fields = ['product','price', 'start_date', 'end_date'],
                                            exclude = [],
                                            widgets=ProductPriceWidgets,
                                            can_delete=True,extra=0,
                                            )

#class AlbumForm(ModelForm):
#    class Meta:
#        model = Album
#        fields = '__all__'
#        labels = {
#                    'title': 'album title',
#                    'artist': 'album artist'
#                }

#TrackFormSet = inlineformset_factory(Album, Track, fields = ['album', 'number', 'name','create_date'],
#                                    widgets={'create_date':forms.DateInput(attrs={'type': 'date'}),
#                                            },
#                                    exclude = [], can_delete = True,extra=2)

class ConfigForm(ModelForm):
    class Meta:
        model = Config
        fields = ('name','detail',)

class OrderForm(ModelForm):
    class Meta:
        model = Order
        fields = ['create_date']

    def __init__(self, *args, **kwargs):
        super(OrderForm, self).__init__(*args, **kwargs)
        instance = getattr(self, 'instance', None)
        if instance and instance.id:
            self.fields['create_date'].required = False
            self.fields['create_date'].widget.attrs['disabled'] = 'disabled'

class OrderProductForm(ModelForm):
    class Meta:
        model = OrderProduct
        exclude = ()

    def __init__(self, *args, **kwargs):
        super(OrderProductForm, self).__init__(*args, **kwargs)
        instance = getattr(self, 'instance', None)
        if instance and instance.id:
            self.fields['product'].required = False
            self.fields['product'].widget.attrs['disabled'] = 'disabled'

    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data

    def clean_order_qty(self):
        cleaned_data = super().clean()
        order_qty = cleaned_data.get("order_qty")
        if order_qty <= 0:
            raise ValidationError("order quantity must not be zero delete the line if you don't want it")
        return order_qty

    def clean_product(self):
        # As shown in the above answer.
        instance = getattr(self, 'instance', None)
        if instance:
            return instance.product
        else:
            return self.cleaned_data.get('product', None)

#over ride the has_changed method to return True by default if you want the form's default values to be saved without user update.
    def has_changed(self):
        return True

OrderProductFormset = inlineformset_factory(Order, OrderProduct, fields = ['product', 'order_qty','order_product_price'],
                                            extra=0,
                                            form=OrderProductForm,
                                            exclude = [], can_delete = True
                                            )

def populate_TOPBAR_OPTION_CHOICES():
    TOPBAR_OPTION_CHOICES = []
    topbar_list = Config.objects.get(name='Topbar')
    detail = topbar_list.detail
    detail_list=detail.splitlines()
    for ut1 in detail_list:
        TOPBAR_OPTION_CHOICES.append((ut1,ut1))
    return TOPBAR_OPTION_CHOICES

class MenuItemsForm(ModelForm):
    topbar_CHOICES = []
    topbar_CHOICES=populate_TOPBAR_OPTION_CHOICES()

    topbar_option=forms.CharField(label='topbar option', widget=forms.Select(choices=topbar_CHOICES))
    class Meta:
        model = MenuItems
        fields = ('name','url','authenticated_only','topbar_option')

MenuItemsFormSet = modelformset_factory(MenuItems,MenuItemsForm,extra=1, can_delete = True)

