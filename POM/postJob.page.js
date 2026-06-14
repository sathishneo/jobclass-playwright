// class PostJobPage {
//   constructor(page) {
//     this.page = page;
    
//     // Select2 triggers (the containers you click to open the dropdown)
//     this.categoryDropdown = page.locator('#select2-category-container');
//     this.jobTypeDropdown = page.locator('#select2-ad_type-container');
//     this.locationDropdown = page.locator('#select2-location-container');
    
//     // Global Select2 search field that appears dynamically when opened
//     this.select2SearchInput = page.locator('.select2-search__field');

//     // Native inputs and textareas
//     this.jobTitleInput = page.getByRole('textbox', { name: 'Job title *' });
//     this.descriptionTextarea = page.getByRole('textbox', { name: 'Describe ad *' });
//     this.salaryMinInput = page.getByRole('textbox', { name: 'Salary (min)' });
//     this.salaryMaxInput = page.getByRole('textbox', { name: 'Salary (max)' });
//     this.startDateInput = page.getByRole('textbox', { name: 'Start Date' });
//     this.companyNameInput = page.getByRole('textbox', { name: 'Company Name *' });
//     this.companyDescriptionTextarea = page.getByRole('textbox', { name: 'Company Description *' });
//     this.websiteInput = page.getByRole('textbox', { name: 'Company Website' });
//     this.contactNameInput = page.getByRole('textbox', { name: 'Contact Name' }); // Fixed from locator loop
//     this.contactEmailInput = page.getByRole('textbox', { name: 'Contact Email *' });
//     this.phoneInput = page.getByRole('textbox', { name: 'Phone Number' });
//     this.submitButton = page.getByRole('button', { name: 'Submit' });
//     this.errorMessage = page.getByText('Oops ! An error has occurred. Please correct the red fields in the form', { exact: true });
//   }

//   /**
//    * Helper method to handle Select2 dropdowns WITHOUT a search bar
//    */
//   async selectSelect2Option(dropdownTrigger, optionText) {
//     // 1. Click the Select2 container to open the options list overlay
//     await dropdownTrigger.click();
    
//     // 2. Click the option directly from the opened dropdown menu
//     // Select2 lists options inside elements with the class '.select2-results__option'
//     await this.page.locator('.select2-results__option', { hasText: optionText }).first().click();
//    await this.page.locator('.select2-results__option', { hasText: optionText }).first().click();

//   }


//   async fillJobForm(jobData) {
//     // Handling Select2 Dropdowns using our helper
//     if (jobData.category) {
//       await this.selectSelect2Option(this.categoryDropdown, jobData.category);
//     }
    
//     // Standard text inputs use standard locators directly
//     await this.jobTitleInput.fill(jobData.title);
//     await this.descriptionTextarea.fill(jobData.description);
    
//     if (jobData.jobType) {
//       await this.selectSelect2Option(this.jobTypeDropdown, jobData.jobType);
//     }
    
//     if (jobData.salaryMin) {
//       await this.salaryMinInput.fill(jobData.salaryMin);
//     }
//     if (jobData.salaryMax) {
//       await this.salaryMaxInput.fill(jobData.salaryMax);
//     }
//     if (jobData.startDate) {
//       await this.startDateInput.fill(jobData.startDate);
//     }
    
//     await this.companyNameInput.fill(jobData.companyName);
//     await this.companyDescriptionTextarea.fill(jobData.companyDescription);
    
//     if (jobData.website) {
//       await this.websiteInput.fill(jobData.website);
//     }
//     if (jobData.location) {
//       await this.selectSelect2Option(this.locationDropdown, jobData.location);
//     }
    
//     // Using clean locator assignments
//     const contactName = jobData.contactName || jobData.companyName;
//     await this.contactNameInput.fill(contactName);
    
//     const contactEmail = jobData.contactEmail || jobData.email;
//     await this.contactEmailInput.fill(contactEmail);
    
//     if (jobData.phone) {
//       await this.phoneInput.fill(jobData.phone);
//     }
//   }

//   async submit() {
//     await this.submitButton.click();
//   }

//   async getErrorMessage() {
//     return await this.errorMessage.textContent();
//   }
// }

// export default PostJobPage;
 

class PostJobPage {
  constructor(page) {
    this.page = page;

    // Non-searchable Select2
    this.categoryDropdown = page.locator('#select2-category-container');
    this.jobTypeDropdown = page.locator('#select2-ad_type-container');

    // Searchable Select2
    this.locationDropdown = page.locator('#select2-location-container');
    this.subLocationDropdown = page.locator('#select2-sub_location-container');
    this.cityDropdown = page.locator('#select2-city-container');

    // Inputs
    this.jobTitleInput = page.getByRole('textbox', { name: 'Job title *' });
    this.descriptionTextarea = page.getByRole('textbox', { name: 'Describe ad *' });

    this.salaryMinInput = page.getByRole('textbox', { name: 'Salary (min)' });
    this.salaryMaxInput = page.getByRole('textbox', { name: 'Salary (max)' });

    this.companyNameInput = page.getByRole('textbox', { name: 'Company Name' });
    this.companyDescriptionTextarea = page.getByRole('textbox', {
      name: 'Company Description *'
    });

    this.websiteInput = page.getByRole('textbox', {
      name: 'Company Website'
    });

    this.contactNameInput = page.getByRole('textbox', {
      name: 'Contact Name'
    });

    this.contactEmailInput = page.getByRole('textbox', {
      name: 'Contact Email *'
    });

    this.phoneInput = page.getByRole('textbox', {
      name: 'Phone Number'
    });

    this.submitButton = page.getByRole('button', {
      name: 'Submit'
    });
  }

  // Non-searchable Select2
  async selectSelect2Option(dropdown, value) {
    await dropdown.click();

    await this.page
      .locator('.select2-results__option')
      .filter({ hasText: value })
      .first()
      .click();
  }

  // Searchable Select2
  async searchAndSelectOption(dropdown, value) {
    await dropdown.click();

    await this.page
      .locator('.select2-search__field')
      .fill(value);

    await this.page
      .locator('.select2-results__option')
      .filter({ hasText: value })
      .first()
      .click();
  }

  async fillJobForm(jobData) {

    // Category
    if (jobData.category) {
      await this.selectSelect2Option(
        this.categoryDropdown,
        jobData.category
      );
    }

    // Title
    await this.jobTitleInput.fill(jobData.title);

    // Description
    await this.descriptionTextarea.fill(jobData.description);

    // Job Type
    if (jobData.jobType) {
      await this.selectSelect2Option(
        this.jobTypeDropdown,
        jobData.jobType
      );
    }

    // Salary
    if (jobData.salaryMin) {
      await this.salaryMinInput.fill(jobData.salaryMin);
    }

    if (jobData.salaryMax) {
      await this.salaryMaxInput.fill(jobData.salaryMax);
    }

    // Location
    if (jobData.location) {
      await this.searchAndSelectOption(
        this.locationDropdown,
        jobData.location
      );
    }

    // Sub-location
    if (jobData.subLocation) {
      await this.searchAndSelectOption(
        this.subLocationDropdown,
        jobData.subLocation
      );
    }

    // City
    if (jobData.city) {
      await this.searchAndSelectOption(
        this.cityDropdown,
        jobData.city
      );
    }

    // Company
    await this.companyNameInput.fill(jobData.companyName);

    await this.companyDescriptionTextarea.fill(
      jobData.companyDescription
    );

    if (jobData.website) {
      await this.websiteInput.fill(jobData.website);
    }

    // Contact
    if (jobData.contactName) {
      await this.contactNameInput.fill(jobData.contactName);
    }

    if (jobData.contactEmail) {
      await this.contactEmailInput.fill(jobData.contactEmail);
    }

    if (jobData.phone) {
      await this.phoneInput.fill(jobData.phone);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
}

export default PostJobPage;