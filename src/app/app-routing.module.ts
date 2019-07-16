import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'live-tracking', loadChildren: './live-tracking/live-tracking.module#LiveTrackingPageModule' },
  { path: 'fuel', loadChildren: './fuel/fuel.module#FuelPageModule' },
  { path: 'tracking', loadChildren: './tracking/tracking.module#TrackingPageModule' },
  { path: 'play-back-flash', loadChildren: './play-back-flash/play-back-flash.module#PlayBackFlashPageModule' },
  { path: 'flash-play-back', loadChildren: './flash-play-back/flash-play-back.module#FlashPlayBackPageModule' },
  { path: 'alerts', loadChildren: './alerts/alerts.module#AlertsPageModule' },
  { path: 'activities', loadChildren: './activities/activities.module#ActivitiesPageModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'fuelview', loadChildren: './fuelview/fuelview.module#FuelviewPageModule' },
  { path: 'ful', loadChildren: './ful/ful.module#FulPageModule' },
  { path: 'fuelper', loadChildren: './fuelper/fuelper.module#FuelperPageModule' },
  { path: 'fuel-dashboard', loadChildren: './fuel-dashboard/fuel-dashboard.module#FuelDashboardPageModule' },
  { path: 'mileages', loadChildren: './mileages/mileages.module#MileagesPageModule' },
  { path: 'cashflow-dashboard', loadChildren: './cashflow-dashboard/cashflow-dashboard.module#CashflowDashboardPageModule' },
  { path: 'expenses', loadChildren: './expenses/expenses.module#ExpensesPageModule' },
  { path: 'dispatch', loadChildren: './dispatch/dispatch.module#DispatchPageModule' },
  { path: 'tru', loadChildren: './tru/tru.module#TruPageModule' },
  { path: 'account-summary', loadChildren: './account-summary/account-summary.module#AccountSummaryPageModule' },
  { path: 'expenses-enterance', loadChildren: './expenses-enterance/expenses-enterance.module#ExpensesEnterancePageModule' },
  { path: 'vehicle-performance', loadChildren: './vehicle-performance/vehicle-performance.module#VehiclePerformancePageModule' },
  { path: 'view-expenses', loadChildren: './view-expenses/view-expenses.module#ViewExpensesPageModule' },
  { path: 'vehmgt', loadChildren: './vehmgt/vehmgt.module#VehmgtPageModule' },
  { path: 'default', loadChildren: './default/default.module#DefaultPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'service', loadChildren: './service/service.module#ServicePageModule' },
  { path: 'schedule-linked', loadChildren: './schedule-linked/schedule-linked.module#ScheduleLinkedPageModule' },
  { path: 'new-schedule', loadChildren: './new-schedule/new-schedule.module#NewSchedulePageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
