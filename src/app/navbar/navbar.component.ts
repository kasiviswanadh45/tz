import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { StateService } from '../services/state.service';
import { DistrictService } from '../services/district.service';
import { AreaService } from '../services/area.service';
import { ProductuserService } from '../services/productuser.service';
import { AuthService } from '../services/auth.service';

import { SelectionService } from '../selection.service';

import { ProductDTO } from '../Models/product.model';
import { LoginComponent } from '../login/login.component';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  states: any[] = [];
  districts: any[] = [];
  areas: any[] = [];

  selectedState: number | null = null;
  selectedDistrict: number | null = null;
  selectedArea: number | null = null;

  products: ProductDTO[] = [];
  filteredProducts: ProductDTO[] = [];
  selectedFilter: string = 'all';
  dropdownsVisible: boolean = true;

  currentUser$ = this.authService.currentUser$; // Observable to track current user

  constructor(
    private router: Router,
    private stateService: StateService,
    private districtService: DistrictService,
    private areaService: AreaService,
    private authService: AuthService,
    private selectionService: SelectionService,
    private productuserService: ProductuserService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadStates();
  }

  // Load states from the service
  loadStates(): void {
    this.stateService.getAllStates().subscribe({
      next: (data) => {
        this.states = data;
        this.cdr.detectChanges(); // Force change detection
      },
      error: (error) => console.error('Error fetching states:', error),
    });
  }

  // When a state is selected, load its districts
  onStateChange(stateId: number): void {
    this.selectedState = stateId;
    this.loadDistricts(stateId);
    this.selectionService.setStateId(stateId);
    // Reset lower-level dropdowns
    this.selectedDistrict = null;
    this.selectedArea = null;
    this.districts = [];
    this.areas = [];
  }

  // Load districts based on the selected state
  loadDistricts(stateId: number): void {
    this.districtService.getDistrictsByState(stateId).subscribe({
      next: (data) => this.districts = data,
      error: (error) => console.error('Error fetching districts:', error),
    });
  }

  // When a district is selected, load its areas
  onDistrictChange(districtId: number): void {
    this.selectedDistrict = districtId;
    this.loadAreas(districtId);
    this.selectionService.setDistrictId(districtId);
    // Reset area dropdown
    this.selectedArea = null;
    this.areas = [];
  }

  // Load areas based on the selected district
  loadAreas(districtId: number): void {
    this.areaService.getAreasByDistrict(districtId).subscribe({
      next: (data) => this.areas = data,
      error: (error) => console.error('Error fetching areas:', error),
    });
  }

  // When an area is selected, load its products
  onAreaChange(areaId: number): void {
    this.selectedArea = areaId;
    this.loadProductsByArea(areaId);
    this.selectionService.setAreaId(areaId);
  }

  // Load products by the selected area
  loadProductsByArea(areaId: number): void {
    this.productuserService.getProductsByArea(areaId).subscribe({
      next: (data) => {
        this.products = data;
        this.filterProducts();
        this.resetSelections();
      },
      error: (error) => console.error('Error fetching products by area:', error),
    });
  }

  resetSelections(): void {
    this.selectedState = null;
    this.selectedDistrict = null;
    this.selectedArea = null;
    this.districts = [];
    this.areas = [];
  }

  // Filter products based on the selected filter (vegetable, grocery, etc.)
  onFilterChange(): void {
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.selectedFilter === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.productType === this.selectedFilter);
    }
  }

  // Toggle dropdown visibility
  toggleDropdowns(): void {
    this.dropdownsVisible = !this.dropdownsVisible;
  }

  // Open login dialog
  openLoginDialog(): void {
    this.dialog.open(LoginComponent, { width: '400px' });
  }

  // Open registration dialog
  openRegistrationDialog(): void {
    this.dialog.open(UserRegistrationComponent, { width: '500px' });
  }

  // Open user profile dialog
  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, { width: '700px' });
  }

  // Logout the user
  // Logout the user
  logout(): void {
    this.authService.logout(); // Clear JWT token and reset user state
    this.router.navigate(['/logout']); // Redirect to the login page after logout
  }
}
