from django.conf.urls import url,include
from . import views
from .views import *
app_name='TheApp'
from django.conf.urls.static import static
from django.conf import settings


urlpatterns=[
    url(r'^$',  views.index,name='index'),
    url(r'^about/$', views.about,name='about'),
    url(r'^CreateCategory/$', CreateCategoryView.as_view(),name='CreateCategory'),
    url(r'^category/(?P<cslug>[\w\-]+)/$', views.show_category, name='show_category'),
    url(r'^UpdateCategory/(?P<slug>[\w\-]+)/$', UpdateCategory.as_view(), name='UpdateCategory'),
    url(r'^like_category/$', views.like_category, name='like_category'),
    url(r'^category_autocomplete/$', views.category_autocomplete, name='category_autocomplete'),
    url(r'^autocompleteCategory/$', views.autocompleteCategory,name='autocompleteCategory'),
    url(r'^CategorySearchAndDisplay/$', views.CategorySearchAndDisplay.as_view(), name='CategorySearchAndDisplay'),
    url(r'^register/$', views.register, name='register'), # ADD NEW PATTERN!
    url(r'^user_login_call/$', views.user_login_call, name='user_login_call'),
    url(r'^user_login/$', views.user_login, name='user_login'),
    url(r'^user_logout/$', views.user_logout, name='user_logout'),
    url(r'^category_list/$', views.category_list, name='category_list'),
    url(r'^category_list_read_only/$', views.category_list_read_only, name='category_list_read_only'),
    url(r'^get_menuitems/$', views.get_menuitems, name='get_menuitems'),
    url(r'^CreateFilm/$', CreateFilm.as_view(),name='CreateFilm'),
    url(r'^UpdateFilm/(?P<slug>[\w\-]+)/$', UpdateFilm.as_view(),name='UpdateFilm'),
    url(r'^film/(?P<cslug>[\w\-]+)/$', views.show_film, name='show_film'),
    url(r'^CreateFilmGenre/$', CreateFilmGenre.as_view(),name='CreateFilmGenre'),
    url(r'^UpdateFilmGenre/(?P<slug>[\w\-]+)/$', UpdateFilmGenre.as_view(),name='UpdateFilmGenre'),
    url(r'^FilmGenreListView/$', FilmGenreListView.as_view(),name='FilmGenreListView'),
    url(r'^FilmListView/$', FilmListView.as_view(),name='FilmListView'),
    url(r'^CreateLanguage/$', CreateLanguage.as_view(),name='CreateLanguage'),
    url(r'^enigma_non_single_page/$', views.enigma_non_single_page, name='enigma_non_single_page'),
    url(r'^EnigmaJson/$', views.EnigmaJson),
    url(r'^enigma_single_page/$', views.enigma_single_page,name='enigma_single_page'),
    url(r'^mastermind/$', views.mastermind,name='mastermind'),
    url(r'^mastermind_radioButton/$', views.mastermind_radioButton,name='mastermind_radioButton'),
    url(r'^GuessTheFilm/$', views.GuessTheFilm,name='GuessTheFilm'),
    url(r'^CreateMessage/$', CreateMessage.as_view(),name='CreateMessage'),
    url(r'^CreateProduct/$', CreateProduct.as_view(),name='CreateProduct'),
    url(r'^ProductStockPriceCreate/$', ProductStockPriceCreate.as_view(),name='ProductStockPriceCreate'),
    url(r'^ProductStockPriceCreate2/$', ProductStockPriceCreate2.as_view(),name='ProductStockPriceCreate2'),
    url(r'^ProductStockPriceCreate3/$', ProductStockPriceCreate3.as_view(),name='ProductStockPriceCreate3'),
    url(r'^ProductStockPriceUpdate/(?P<pk>\d+)/$', ProductStockPriceUpdate.as_view(),name='ProductStockPriceUpdate'),
    url(r'^ProductStockPriceUpdate2/(?P<pk>\d+)/$', ProductStockPriceUpdate2.as_view(),name='ProductStockPriceUpdate2'),
    url(r'^ProductList/$', ProductList.as_view(),name='ProductList'),
    url(r'^ProductListReadOnly/$', ProductListReadOnly.as_view(),name='ProductListReadOnly'),
    url(r'^ProductListAddToCart/$', ProductListAddToCart.as_view(),name='ProductListAddToCart'),
    url(r'^like_product/$', views.like_product, name='like_product'),
    url(r'^AddToCart/$', views.AddToCart, name='AddToCart'),
    url(r'^ShowSessions/$', views.ShowSessions,name='ShowSessions'),
    url(r'^GetCartTotal/$', views.GetCartTotal, name='GetCartTotal'),
    url(r'^UpdateCartLine/(?P<pk>\d+)/$', UpdateCartLine.as_view(),name='UpdateCartLine'),
    url(r'^UpdateCartLine2/(?P<pk>\d+)/$', UpdateCartLine2.as_view(),name='UpdateCartLine2'),
    url(r'^UpdateCartHeader/(?P<pk>\d+)/$', UpdateCartHeader.as_view(),name='UpdateCartHeader'),
    ]
