from django.shortcuts import render,redirect
from .models import *
from .forms import *
from .serializers import *
from .enigma import *
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView,DetailView
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import  HttpResponse,HttpResponseRedirect
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status,filters
from rest_framework.generics import ListCreateAPIView,ListAPIView
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.contrib.auth.mixins import LoginRequiredMixin
from datetime import datetime, timedelta, time,date
from django.utils.decorators import method_decorator
from django.contrib.sessions.backends.db import SessionStore
import json
import re
import random

# Create your views here.
def index(request):
    context_dict={}
    category_list=Category.objects.all().order_by('pk')[3:]
    context_dict={'categories': category_list}
    return render(request, 'TheApp/index.html', context=context_dict)

def ShowSessions(request):
    context_dict={}
    s = SessionStore()
    s.create()
    session_list=[]
    session_list.append(s)
    context_dict={'sessions': session_list}
    return render(request, 'TheApp/ShowSessions.html', context=context_dict)

def about(request):
    context_dict={}
    return render(request,'TheApp/about.html',context=context_dict)

class CreateCategoryView(CreateView):
    template_name = 'TheApp/CreateCategory.html'
    form_class = CategoryForm

def show_category(request,cslug):
    context_dict={}
    try:
        category=Category.objects.get(slug=cslug)
        context_dict['category']=category
    except Category.DoesNotExist:
        context_dict['category']=None
    return render(request,'TheApp/category.html',context_dict)

############################################################################################################################
###View to process clicks on the category like button##
############################################################################################################################
def like_category(request):
    cat_id = None

    if request.method == 'GET':
        cat_id = request.GET['category_id']
    likes = 0
    print(cat_id)
    if cat_id:
        cat = Category.objects.get(id=int(cat_id))
        if cat:
            likes = cat.likes + 1
            cat.likes = likes
            cat.save()
    return HttpResponse(likes)

def category_autocomplete(request):
    if request.is_ajax():
        q = request.GET.get('term', '')
        categories = Category.objects.filter(name__icontains = q )[:20]
        results = []
        for cat in categories:
            cat_json = {}
            cat_json['id'] = cat.id
            cat_json['name'] = cat.name
            cat_json['value'] = cat.name
            cat_json['views'] = cat.views
            cat_json['likes'] = cat.likes
            results.append(cat_json)
        data = json.dumps(results)
    else:
        data = 'fail'
    mimetype = 'application/json'
    return HttpResponse(data, mimetype)

def autocompleteCategory(request):
  if request.is_ajax():
    q = request.GET.get('term', '')
    category = Category.objects.filter(name__icontains=q)
    results = []
    for c in category:
      category_json = {}
      category_json = c.name
      results.append(category_json)
    data = json.dumps(results)
  else:
    data = 'fail'
  mimetype = 'application/json'
  return HttpResponse(data, mimetype)

class CategorySearchAndDisplay(ListView):
    model = Category
    template_name='TheApp/CategorySearchAndDisplay.html'
    context_object_name = 'my_favorite_categories'
    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(CategorySearchAndDisplay, self).get_context_data(**kwargs)

        search_text = ""  # Assume no search
        if (self.request.method == "GET"):
            """
            The search form has been submitted.

            Must be GET, not post.
            - http://stackoverflow.com/questions/25878993/django-view-works-with-default-call-but-form-submission-to-same-view-only-calls

            Also, must use
                if(self.request.method == "GET")
            not
                if(self.request.GET)

            https://docs.djangoproject.com/en/1.7/ref/request-response/#django.http.HttpRequest.method
            https://docs.djangoproject.com/en/1.7/ref/request-response/#django.http.HttpRequest.POST
            """
            search_text = self.request.GET.get("category", "").strip().lower()


        if (search_text != ""):
            category_search_results = Category.objects.filter(name__contains=search_text)
        else:
            # An empty list instead of None. In the template, use
            #  {% if color_search_results.count > 0 %}
            category_search_results = []

        # Add items to the context:

        # The search text for display and result set
        context["search_text"] = search_text
        context["category_search_results"] = category_search_results
        return context

#This register method automatically logs in the newly created user
@csrf_exempt
def register(request):
    # Like before, get the request's context.
    context = RequestContext(request)

    # A boolean value for telling the template whether the registration was successful.
    # Set to False initially. Code changes value to True when registration succeeds.
    registered = False

    # If it's a HTTP POST, we're interested in processing form data.
    if request.method == 'POST':
        # Attempt to grab information from the raw form information.
        # Note that we make use of both UserForm and UserProfileForm.
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)

        # If the two forms are valid...
        if user_form.is_valid() and profile_form.is_valid():
            # Save the user's form data to the database.
            user = user_form.save()

            # Now we hash the password with the set_password method.
            # Once hashed, we can update the user object.
            user.set_password(user.password)
            user.save()

            # Now sort out the UserProfile instance.
            # Since we need to set the user attribute ourselves, we set commit=False.
            # This delays saving the model until we're ready to avoid integrity problems.
            profile = profile_form.save(commit=False)
            profile.user = user

            # Now we save the UserProfile model instance.
            profile.save()

            # Update our variable to tell the template registration was successful.
            registered = True
            # Once registered, login the new user.

            new_user = authenticate(username=user_form.cleaned_data['username'],
                                    password=user_form.cleaned_data['password'],
                                    )
            login(request, new_user)

        # Invalid form or forms - mistakes or something else?
        # Print problems to the terminal.
        # They'll also be shown to the user.
        else:
            print (user_form.errors, profile_form.errors)

    # Not a HTTP POST, so we render our form using two ModelForm instances.
    # These forms will be blank, ready for user input.
    else:
        user_form = UserForm()
        profile_form = UserProfileForm()

    context_dict={'user_form': user_form, 'profile_form': profile_form, 'registered': registered}
    # Render the template depending on the context.
    return render(request,'TheApp/register.html'  ,context=context_dict)

def user_login_call(request):
    return render(request,'TheApp/user_login.html')

@csrf_exempt
def user_login(request):
    username=request.POST.get('username')
    password=request.POST.get('password')
    user = authenticate(username=username, password=password)
    login_response = False
    if user:
        # Is the account active? It could have been disabled.
        if user.is_active:
            # If the account is valid and active, we can log the user in.
            # We'll send the user back to the homepage.
            login(request, user)
            login_response=True
    data = {
        'success': login_response
    }
    return JsonResponse(data)

@login_required
def user_logout(request):
    # Since we know the user is logged in, we can now just log them out.
    logout(request)
    # Take the user back to the homepage.
    return HttpResponseRedirect('/TheApp/')

@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def category_list_read_only(request):
    if request.method == 'GET':
        categories = Category.objects.all().order_by('pk')[:3]
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_menuitems(request):
    auth_flag=False
    if request.user.is_authenticated:
        auth_flag = True
        print('authenticated')
    else:
        print('not authenticated')
    menuitems_list=MenuItems.objects.all()
    results = []
    for mi in menuitems_list:
        mi_json = {}
        mi_json['auth_flag']=auth_flag
        mi_json['url'] = mi.url
        mi_json['authenticated_only'] = mi.authenticated_only
        mi_json['name'] = mi.name
        mi_json['app'] = mi.app
        results.append(mi_json)

    data = json.dumps(results)
    mimetype = "application/json"
    return HttpResponse(data, mimetype)

class CreateFilm(CreateView):
  model = Film
  success_url = '/TheApp/'
  template_name = "TheApp/new_film.html"
  form_class = FilmForm

class UpdateFilm(UpdateView):
  model = Film
  success_url = '/TheApp/'
  template_name = 'TheApp/new_film.html'
  form_class = FilmForm

def show_film(request,cslug):
    context_dict={}
    try:
        film=Film.objects.get(slug=cslug)
        context_dict['film']=film
    except Film.DoesNotExist:
        context_dict['film']=None
    return render(request,'TheApp/film.html',context_dict)

class CreateFilmGenre(CreateView):
  model = FilmGenre
  success_url = '/TheApp/'
  template_name = "TheApp/CreateFilmGenre.html"
  form_class = FilmGenreForm

class UpdateFilmGenre(UpdateView):
    model = FilmGenre
    form_class = FilmGenreForm
    success_url = '/TheApp/'
    template_name = "TheApp/CreateFilmGenre.html"

class FilmGenreListView(ListView):
    model = FilmGenre
    template_name = "TheApp/FilmGenreList.html"

class FilmListView(ListView):
    model = Film
    template_name = "TheApp/FilmList.html"

class UpdateCategory(UpdateView):
    model = Category
    form_class = CategoryForm
    success_url = '/TheApp/'
    template_name = "TheApp/CreateCategory.html"

class CreateLanguage(CreateView):
  model = Language
  success_url = '/TheApp/'
  template_name = "TheApp/CreateLanguage.html"
  form_class = LanguageForm

def enigma_result(request,input='',config='',result=''):
    context_dict={}
    context_dict={'input':input,'config':config,'result':result}
    return render(request, 'TheApp/enigma_result.html', context=context_dict)

def enigma_non_single_page(request):
    if request.method == 'POST':
        form = InputForm(request.POST)
        form_valid_flag=form.is_valid()
        if form_valid_flag:
            regex = re.compile('[^a-zA-Z]')
            input_text=regex.sub('', form.data['input_text'])
            Config=form.data['config_text']
            ConfigUpper=Config.upper()
            outstring= enigma(request,input_text,ConfigUpper)
            return enigma_result(request,form.data['input_text'],Config,outstring)
        else:
            print("error")
    else:
        form = InputForm(request.POST)
    return render(request, 'TheApp/enigma.html', {'form': form})

def EnigmaJson(request):
    config = ""
    input_text=""
    if request.method == 'GET':
        config = request.GET['config']
        regex = re.compile('[^a-zA-Z]')
        input_text=regex.sub('', request.GET['input_text'])
        ConfigUpper=config.upper()
        print(ConfigUpper)
        outstring= enigma(request,input_text,ConfigUpper)
    return HttpResponse(outstring)

def enigma_single_page(request):
    return render(request, 'TheApp/enigma_js.html')

def mastermind(request):
    return render(request, 'TheApp/mastermind.html')

def mastermind_radioButton(request):
    return render(request, 'TheApp/mastermind_radioButton.html')

def selectRandomFilm():
    FilmList=Film.objects.values_list('name', flat=True).order_by('pk')
    numberOfFilms=len(FilmList)
    return FilmList[random.randint(0, numberOfFilms-1)]

def GuessTheFilm(request):
    myfilm=selectRandomFilm()
    print(myfilm)
    context_dict={'film': myfilm}
    return render(request, 'TheApp/GuessTheFilm.html', context=context_dict)

class CreateMessage(CreateView):
#dispatch is a class method which allows CBVs to access the request data such as the logged in user. Very useful
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            print("not logged in")
        else:
            print(request.user)
        return super(CreateMessage, self).dispatch(request,*args, **kwargs)

    def form_valid(self, form):
        obj = form.save(commit=False)
        #check if user is logged, if it is then get the user id and name to populate the message user details
        if self.request.user.is_authenticated:
            obj.userPk= self.request.user.id
            obj.name = str(self.request.user)
        else:
            obj.userPk= 0
        obj.save()
        return super(CreateMessage, self).form_valid(form)

    def get_form_kwargs(self):
        kwargs = super(CreateMessage, self).get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs

    def get_initial(self):
        if self.request.user.is_authenticated:
            return { 'name': self.request.user,'email': self.request.user.email }

#use get_context_data to get the latest 3 messages and display on template context.
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        message_list = Message.objects.all().order_by('-pk')[:3]
        context["messages"] = message_list
        return context

    model = Message
    success_url = '/TheApp/'
    template_name = "TheApp/CreateMessage.html"
    form_class = MessageForm

Login_Redirect_URL='/TheApp/user_login_call'

class CreateProduct(LoginRequiredMixin,CreateView):
    model = Product
    success_url = '/TheApp/ProductList'
    template_name = "TheApp/CreateProduct.html"
    form_class = ProductForm
    login_url=Login_Redirect_URL

#dispatch is a class method which allows CBVs to access the request data such as the logged in user. Very useful
    def dispatch(self, request, *args, **kwargs):
        return super(CreateProduct, self).dispatch(request,*args, **kwargs)
#user form_valid to link the model user field with the current logged in user.
    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

PriceFormsetInitial=[{'price': 0.01,'start_date':date.today(),'end_date':date.today()+ timedelta(days = 1),'min_order_qty':0}]
StockFormsetInitial=[{'stock_available': 0,'stock_reserved_by_customer_order':0,'stock_awaiting_delivery_from_supplier':0}]

class ProductStockPriceCreate(LoginRequiredMixin,CreateView):
    model = Product
    success_url = '/TheApp/ProductList'
    #    fields = '__all__'
    form_class=ProductForm
    template_name = 'TheApp/ProductStockPriceCreate.html'
    login_url=Login_Redirect_URL

#override get_initial to set the initial values of your form.
    def get_initial(self):
        return { 'name': 'apple','price': 15 }

#When you want to default a date field on a form, use date.today() for today, for yesterday or tomorrow add/substract timedelta(days=1)
#This should be in the dictionary in the list that the initial argument uses.

    def get_context_data(self, **kwargs):
        context = super(ProductStockPriceCreate, self).get_context_data(**kwargs)
        if self.request.POST:
            context['qty_formset'] = ProductStockFormSet(self.request.POST,initial=StockFormsetInitial)
            context['price_formset'] = ProductPriceFormSet(self.request.POST,initial=PriceFormsetInitial)
        else:
            context['qty_formset'] = ProductStockFormSet(initial=StockFormsetInitial)
            context['price_formset'] = ProductPriceFormSet(initial=PriceFormsetInitial)
        return context

    def dispatch(self, request, *args, **kwargs):
        return super(ProductStockPriceCreate, self).dispatch(request,*args, **kwargs)

    def form_valid(self, form):
        context = self.get_context_data()
        qty_formset = context['qty_formset']
        price_formset = context['price_formset']
        if qty_formset.is_valid() and price_formset.is_valid():
            form.instance.user = self.request.user
            self.object = form.save()
            qty_formset.instance = self.object
            price_formset.instance = self.object
            qty_formset.save()
            price_formset.save()
            return redirect(self.success_url)
        else:
            print('error')
            return self.render_to_response(self.get_context_data(form=form))

class ProductStockPriceCreate2(LoginRequiredMixin,CreateView):
    model = Product
    success_url = '/TheApp/ProductList'
    #    fields = '__all__'
    form_class = ProductForm
    template_name = 'TheApp/ProductStockPriceCreate.html'
    login_url=Login_Redirect_URL

    def get_context_data(self, **kwargs):
        context = super(ProductStockPriceCreate2, self).get_context_data(**kwargs)
        if self.request.POST:
            context['qty_formset'] = ProductStockFormSet(self.request.POST,initial=StockFormsetInitial)
            context['price_formset'] = ProductPriceFormSet2(self.request.POST,initial=PriceFormsetInitial)
        else:
            context['qty_formset'] = ProductStockFormSet(initial=StockFormsetInitial)
            context['price_formset'] = ProductPriceFormSet2(initial=PriceFormsetInitial)
        return context

    def dispatch(self, request, *args, **kwargs):
        return super(ProductStockPriceCreate2, self).dispatch(request,*args, **kwargs)

    def form_valid(self, form):
        context = self.get_context_data()
        price_formset = context['price_formset']
        qty_formset = context['qty_formset']
        if price_formset.is_valid():
            form.instance.user = self.request.user
            self.object = form.save()
            qty_formset.instance = self.object
            price_formset.instance = self.object
            qty_formset.save()
            price_formset.save()
            return redirect(self.success_url)
        else:
            return self.render_to_response(self.get_context_data(form=form))

class ProductStockPriceCreate3(LoginRequiredMixin,CreateView):
    model = Product
    success_url = '/TheApp/ProductList'
    #    fields = '__all__'
    form_class = ProductForm
    template_name = 'TheApp/ProductStockPriceMinQtyCreate.html'
    login_url=Login_Redirect_URL

    def get_context_data(self, **kwargs):
        context = super(ProductStockPriceCreate3, self).get_context_data(**kwargs)
        if self.request.POST:
            context['qty_formset'] = ProductStockFormSet(self.request.POST)
            context['price_formset'] = ProductPriceFormSet2(self.request.POST,initial=PriceFormsetInitial)
            context['MinQty_formset'] = ProductPriceMinQtyPromotionFormSet(self.request.POST,initial=PriceFormsetInitial)
        else:
            context['qty_formset'] = ProductStockFormSet()
            context['price_formset'] = ProductPriceFormSet2(initial=PriceFormsetInitial)
            context['MinQty_formset'] = ProductPriceMinQtyPromotionFormSet(initial=PriceFormsetInitial)
        return context

    def dispatch(self, request, *args, **kwargs):
        return super(ProductStockPriceCreate3, self).dispatch(request,*args, **kwargs)

    def form_valid(self, form):
        #self.object = form.save(commit=False)
        context = self.get_context_data()
        price_formset = context['price_formset']
        qty_formset = context['qty_formset']
        MinQty_formset = context['MinQty_formset']

        if price_formset.is_valid() and MinQty_formset.is_valid():
            form.instance.user = self.request.user
            self.object = form.save()
            qty_formset.instance = self.object
            price_formset.instance = self.object
            MinQty_formset.instance = self.object
            qty_formset.save()
            price_formset.save()
            MinQty_formset.save()
            return redirect(self.success_url)
        else:
            return self.render_to_response(self.get_context_data(form=form))

class ProductStockPriceUpdate(LoginRequiredMixin,UpdateView):
    model = Product
    success_url = '/TheApp/ProductList'
    #    fields = '__all__'
    form_class=ProductForm
    template_name = 'TheApp/ProductStockPriceCreate.html'
    login_url=Login_Redirect_URL

#When you want to default a date field on a form, use date.today() for today, for yesterday or tomorrow add/substract timedelta(days=1)
#This should be in the dictionary in the list that the initial argument uses.

    def get_context_data(self, **kwargs):
        context = super(ProductStockPriceUpdate, self).get_context_data(**kwargs)
        if self.request.POST:
            context['qty_formset'] = ProductStockFormSet(self.request.POST, instance=self.object)
            context['price_formset'] = ProductPriceFormSet(self.request.POST, instance=self.object,initial=PriceFormsetInitial)
            context['qty_formset'].full_clean()
            context['price_formset'].full_clean()
        else:
            context['qty_formset'] = ProductStockFormSet( instance=self.object)
            context['price_formset'] = ProductPriceFormSet( instance=self.object,initial=PriceFormsetInitial)
        return context

    def dispatch(self, request, *args, **kwargs):
        return super(ProductStockPriceUpdate, self).dispatch(request,*args, **kwargs)

    def form_valid(self, form):
        context = self.get_context_data()
        qty_formset = context['qty_formset']
        price_formset = context['price_formset']
        if qty_formset.is_valid() and price_formset.is_valid():
            self.object = form.save()
            qty_formset.instance = self.object
            price_formset.instance = self.object
            qty_formset.save()
            price_formset.save()
            return redirect(self.success_url)
        else:
            return self.render_to_response(self.get_context_data(form=form))

class ProductStockPriceUpdate2(LoginRequiredMixin,UpdateView):
    model = Product
    success_url = '/TheApp/ProductList'
    #    fields = '__all__'
    form_class = ProductForm
    template_name = 'TheApp/ProductStockPriceMinQtyCreate.html'
    login_url=Login_Redirect_URL

    def get_context_data(self, **kwargs):
        context = super(ProductStockPriceUpdate2, self).get_context_data(**kwargs)
        if self.request.POST:
            context['qty_formset'] = ProductStockFormSet(self.request.POST, instance=self.object)
            context['price_formset'] = ProductPriceFormSet2(self.request.POST,initial=PriceFormsetInitial, instance=self.object)
            context['MinQty_formset'] = ProductPriceMinQtyPromotionFormSet(self.request.POST,initial=PriceFormsetInitial, instance=self.object)
        else:
            context['qty_formset'] = ProductStockFormSet(instance=self.object)
            context['price_formset'] = ProductPriceFormSet2(initial=PriceFormsetInitial, instance=self.object)
            context['MinQty_formset'] = ProductPriceMinQtyPromotionFormSet(initial=PriceFormsetInitial, instance=self.object)
        return context

    def dispatch(self, request, *args, **kwargs):
        return super(ProductStockPriceUpdate2, self).dispatch(request,*args, **kwargs)

    def form_valid(self, form):
        #self.object = form.save(commit=False)
        context = self.get_context_data()
        price_formset = context['price_formset']
        qty_formset = context['qty_formset']
        MinQty_formset = context['MinQty_formset']

        if price_formset.is_valid() and MinQty_formset.is_valid():
            form.instance.user = self.request.user
            self.object = form.save()
            qty_formset.instance = self.object
            price_formset.instance = self.object
            MinQty_formset.instance = self.object
            qty_formset.save()
            price_formset.save()
            MinQty_formset.save()
            return redirect(self.success_url)
        else:
            return self.render_to_response(self.get_context_data(form=form))

class ProductList(ListView):
    model=Product
    paginate_by = 3
    def get_queryset(self):
        return Product.objects.all().order_by('-pk')

class ProductListReadOnly(ListView):
    model=Product
    paginate_by = 10

    template_name = 'TheApp/ProductListReadOnly.html'
    def get_queryset(self):
        return Product.objects.all().order_by('-pk')

class ProductListAddToCart(ProductListReadOnly):
    template_name = 'TheApp/ProductListAddToCart.html'

def AddToCart(request):
    prod_id = ""
    user_id=None

    if request.method == 'GET':
        prod_id = request.GET['product_id']
        if request.user.is_authenticated:
            user_id = request.user

        if prod_id:
            prod = Product.objects.get(id=int(prod_id))
            if prod:
                pass
            else:
                return HttpResponse()
        else:
            return HttpResponse()

        today = datetime.now().date()
        tomorrow = today + timedelta(1)
        today_start = datetime.combine(today, time())
        today_end = datetime.combine(tomorrow, time())
###how to get records with today's date on models vvvvvvvv
        CH=CartHeader.objects.filter(create_date__lte=today_end, create_date__gte=today_start,user=user_id).first()
        if CH:
            pass
        else:
            CH=CartHeader(user=user_id)
            CH.save()

        CL=CartLine.objects.filter(cartheader=CH,product=prod).first()
        if CL:
            pass
        else:
            CL=CartLine(cartheader=CH,product=prod,order_qty=1)
            CL.save()
    return HttpResponse(CartLine.objects.filter(cartheader=CH).count())

def GetCartTotal(request):
    user_id=None
    if request.user.is_authenticated:
        user_id = request.user
    today = datetime.now().date()
    tomorrow = today + timedelta(1)
    today_start = datetime.combine(today, time())
    today_end = datetime.combine(tomorrow, time())
###how to get records with today's date on models vvvvvvvv
    CH=CartHeader.objects.filter(create_date__lte=today_end, create_date__gte=today_start,user=user_id).first()
    mi_json = {}
    mi_json['cartTotal']=CartLine.objects.filter(cartheader=CH).count()
    mi_json['cartHeaderPK']=CH.pk
    results=[]
    results.append(mi_json)
#    if CH:
#        return HttpResponse(CartLine.objects.filter(cartheader=CH).count())

    data = json.dumps(results)
    mimetype = "application/json"
    return HttpResponse(data, mimetype)
#    return HttpResponse(0)

class UpdateCartLine(UpdateView):
    model = CartLine
    success_url = '/TheApp/ProductListAddToCart'
    #fields = ['order_qty','order_product_price']
    form_class = CartLineForm
    template_name = 'TheApp/UpdateCartLine1.html'

class UpdateCartHeader(UpdateView):
    model = CartHeader
    success_url = '/TheApp/ProductListAddToCart'
    #fields = ['order_qty','order_product_price']
    form_class = CartHeaderForm
    template_name = 'TheApp/UpdateCartLine1.html'

class UpdateCartLine2(UpdateView):
    model = CartHeader
    success_url = '/TheApp/ProductListAddToCart'
    #    fields = '__all__'
    form_class = CartLineFormset
    template_name = 'TheApp/UpdateCartLine2.html'

    def get_context_data(self, **kwargs):
        context = super(UpdateCartLine2, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = CartLineFormset(self.request.POST, instance=self.object)
        else:
            context['formset'] = CartLineFormset(instance=self.object)
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        cartline_formset = context['formset']
        print(cartline_formset.is_valid())
        if cartline_formset.is_valid():
            cartline_formset.instance = self.object
            cartline_formset.save()
            return redirect(self.success_url)
        else:
            return self.render_to_response(self.get_context_data(form=form))
############################################################################################################################
###View to process clicks on the product like button##
############################################################################################################################
def like_product(request):
    prod_id = None

    if request.method == 'GET':
        prod_id = request.GET['product_id']
    likes = 0
    print(prod_id)
    if prod_id:
        prod = Product.objects.get(id=int(prod_id))
        if prod:
            likes = prod.likes + 1
            prod.likes = likes
            prod.save()
    return HttpResponse(likes)

#class AlbumCreateView(CreateView):
#    model = Album
#    success_url = '/TheApp/'
##    fields = '__all__'
#    form_class = AlbumForm
#    template_name = 'TheApp/album_form2.html'

#    def get_context_data(self, **kwargs):
#        context = super(AlbumCreateView, self).get_context_data(**kwargs)
#        if self.request.POST:
#            context['track_formset'] = TrackFormSet(self.request.POST)
#        else:
#            context['track_formset'] = TrackFormSet()
#        return context

#    def form_valid(self, form):
#        context = self.get_context_data()
#        formset = context['track_formset']
#        if formset.is_valid():
#            self.object = form.save()
#            formset.instance = self.object
#            formset.save()
#            return redirect(self.success_url)
#        else:
#            return self.render_to_response(self.get_context_data(form=form))