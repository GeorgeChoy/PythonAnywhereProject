from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(user_type)
admin.site.register(MenuItems)
admin.site.register(Film)
admin.site.register(FilmGenre)
admin.site.register(Language)
admin.site.register(Message)
admin.site.register(Product)
admin.site.register(ProductPrice)
admin.site.register(ProductStock)
#admin.site.register(Album)
#admin.site.register(Track)
admin.site.register(ProductPriceMinQtyPromotion)
admin.site.register(CartHeader)
admin.site.register(CartLine)
admin.site.register(OrderProduct)
admin.site.register(Order)
admin.site.register(Config)

