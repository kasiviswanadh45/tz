import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomepageComponent } from './homepage/homepage.component';

import { NavbarComponent } from './navbar/navbar.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { ChartComponent } from '@swimlane/ngx-charts';
import { PriceHistoryComponent } from './components/price-history/price-history.component';
import { UploadComponent } from '../upload/upload.component';
import { LatestUpdatesComponent } from './latest-updates/latest-updates.component';
import { FooterComponent } from './footer/footer.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { AdminComponent } from './admin/admin.component';
import { GetProductsComponent } from './get-products/get-products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { authGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, // Root URL loads the HomepageComponent
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'vegetables', component: VegetablesComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'upload', component: UploadComponent },
  { path: 'getproduct', component: GetProductsComponent },
  { path: 'price', component: PriceHistoryComponent },
  { path: 'productform', component: ProductFormComponent },
  { path: 'latestupdates', component: LatestUpdatesComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'ads', component: AdBannerComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: '/' } 
   
];
