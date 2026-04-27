import { Locator, Page } from '@playwright/test';

export class BookingSystem{
    readonly page: Page;
    readonly appointmentBookingText: Locator;
    readonly schedulerContainer: Locator;
    readonly tiresButton: Locator;
    readonly cleaningButton: Locator;
    readonly engineReplacementService: Locator;
    readonly engineReplacementChosenService: Locator;
    readonly nextStepButton: Locator;
    readonly pickDataText: Locator;
    readonly calendarButton: Locator;
    readonly firstAvailableDateField: Locator;
    readonly pickTimeText: Locator;
    readonly timeElevenField: Locator;
    readonly contactDetailsText: Locator;
    readonly vehicleDetailsText: Locator;
    readonly imagesText: Locator;

    readonly clientNameInputField: Locator;
    readonly clientPhoneNumberInputField: Locator;
    readonly clientEmailInputField: Locator;
    readonly clientAddressInputField: Locator;
    readonly clientZipCodeInputField: Locator;
    readonly clientCityInputField: Locator;

    readonly carRegistrationNumberInputField: Locator;
    readonly carMileageInputField: Locator;
    readonly carBrandInputField: Locator;
    readonly carBrandHyundai: Locator;
    readonly carYearSearchBar: Locator;
    readonly carYear2011: Locator;
    readonly hyundaiI40Model: Locator;

    readonly appointmentSummaryText: Locator;
    readonly summaryTireBalancingText: Locator;
    readonly summaryServiceEngineReplacementText: Locator;
    readonly summaryAppointmentDateText: Locator;

    readonly successfulBookingText: Locator;
    readonly successConfirmationEmailText: Locator;

    readonly serviceLoginInputField: Locator;
    readonly servicePasswordInputField: Locator;
    readonly serviceLoginButton: Locator;
    readonly serviceCalendarTitle: Locator;
    readonly serviceDatePickerButton: Locator;
    readonly datePickDay: Locator;
    readonly appointmentFromTestGridCell: Locator;

    constructor( page: Page ){
        this.page = page;
        this.appointmentBookingText = page.getByTestId('client-scheduler-main-container').getByText('Rezerwujesz termin wizyty');
        this.schedulerContainer = page.getByTestId('client-scheduler-main-container');
        this.tiresButton = page.getByRole('button', { name: 'logotyp Opony' });
        this.cleaningButton = page.getByRole('button', { name: 'logotyp Czyszczenie' });
        this.engineReplacementService = page.getByRole('row', { name: 'Wymiana Silnika wymiana' });
        this.engineReplacementChosenService = page.getByRole('rowgroup').getByRole('row', { name: 'Wymiana Silnika wymiana' });
        this.nextStepButton = page.getByTestId('go-next-step-button');
        this.pickDataText = page.getByText('Wybierz datę');
        this.calendarButton = page.getByRole('button', { name: 'Kalendarz' });
        this.firstAvailableDateField = page.getByRole('button', { name: 'niedziela' });
        this.pickTimeText = page.getByText('Wybierz godzinę'); 
        this.timeElevenField = page.getByRole('button', { name: '11:00' });
        this.contactDetailsText = page.locator('.section-title').first();
        this.vehicleDetailsText = page.locator('#pojazd-indywidualny-naglowek');
        this.imagesText = page.locator('#clientSchedulerGalleryCon > .section-title');

        this.clientNameInputField = page.getByTestId('name-of-client-input');
        this.clientPhoneNumberInputField = page.getByTestId('phone-of-client-input');
        this.clientEmailInputField = page.getByTestId('email-of-client-input');
        this.clientAddressInputField = page.getByTestId('address-of-client-input');
        this.clientZipCodeInputField = page.getByTestId('zipcode-of-client-input');
        this.clientCityInputField = page.getByTestId('city-of-client-input');

        this.carRegistrationNumberInputField = page.getByTestId('registration-plate-number-input');
        this.carMileageInputField = page.getByTestId('mileage-number-input');
        this.carBrandInputField = page.getByRole('listbox').filter({ hasText: 'Marka *' }).getByLabel('select')
        this.carBrandHyundai = page.getByRole('option', { name: 'HYUNDAI' });
        this.carYearSearchBar = page.getByRole('searchbox');
        this.carYear2011 = page.getByRole('option', { name: '2011' });
        this.hyundaiI40Model = page.getByRole('option', { name: 'i40 I Kombi Van (VF)' });
        
        this.appointmentSummaryText = page.locator('.section-title.justify-content-center');
        this.summaryTireBalancingText = page.getByText('Wywarzenie opon');
        this.summaryServiceEngineReplacementText = page.getByText('- Wymiana Silnika 2000,00 zł /');
        this.summaryAppointmentDateText = page.getByTestId('client-date-summary-div');

        this.successfulBookingText = page.getByText('Pomyślnie zarezerwowano termin');
        this.successConfirmationEmailText = page.getByText('Potwierdzenie wysłaliśmy na');

        this.serviceLoginInputField = page.getByTestId('login-input');
        this.servicePasswordInputField = page.getByTestId('password-input');
        this.serviceLoginButton = page.getByTestId('submit-button').first();
        this.serviceCalendarTitle = page.getByText('- Kalendarz');
        //TODO: Refactor selector to open the calendar no matter what the day is
        this.serviceDatePickerButton = page.getByText('Pn 27.042026').first();
        this.datePickDay = page.getByTitle('niedziela, 3 maj')
        this.appointmentFromTestGridCell = page.getByText('HYUNDAI i40 I Kombi Van (VF) Krystian Szuta 123456789 - Wymiana Silnika');
    }
    async goto(): Promise <void> {
        await this.page.goto("https://tpsprebeta.integra.com.pl/ClientScheduler?pointOfServiceCode=KAM03TEST");
    }

    async fillClientContactDetails(
        clientName:string,
        clientPhoneNumber:string,
        clientEmail:string,
        clientAddress:string,
        clientZipCode:string,
        clientCity:string,
    ): Promise <void> {
        await this.clientNameInputField.fill(clientName);
        await this.clientPhoneNumberInputField.fill(clientPhoneNumber);
        await this.clientEmailInputField.fill(clientEmail);
        await this.clientAddressInputField.fill(clientAddress);
        await this.clientZipCodeInputField.fill(clientZipCode);
        await this.clientCityInputField.fill(clientCity);
    }

    async fillCarDetails(
        carRegistrationNumber:string,
        carMileage:string,
        carYear2011:string
    ): Promise <void> {
        await this.carRegistrationNumberInputField.fill(carRegistrationNumber);
        await this.carMileageInputField.fill(carMileage);
        await this.carBrandInputField.click();
        await this.carBrandHyundai.click();
        await this.carYearSearchBar.fill(carYear2011);
        await this.carYear2011.click();
        await this.hyundaiI40Model.click();
    }
}