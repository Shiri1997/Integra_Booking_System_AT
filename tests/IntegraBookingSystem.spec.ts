import { test, expect } from '@playwright/test';
import { BookingSystem } from '../pages/bookingSystem.page';
import dotenv from 'dotenv';

dotenv.config();

let bookingSystem: BookingSystem;

test.beforeEach(async ({ page }) => {
  bookingSystem = new BookingSystem(page);
});

test.describe("Booking an appointment- e2e test", () => {
  test("Check if the page is correctly loaded", async ({ page }) => {
    await bookingSystem.goto();
    await expect(bookingSystem.appointmentBookingText).toBeVisible();
    await expect(bookingSystem.schedulerContainer).toBeVisible();
    await expect(bookingSystem.tiresButton).toBeVisible();
    await expect(bookingSystem.cleaningButton).toBeVisible();
  });

  test("Fill data for an appointment", async ({ page }) => {
    await bookingSystem.goto();
    await bookingSystem.tiresButton.click();
    await expect(bookingSystem.engineReplacementService).toBeVisible();
    await bookingSystem.engineReplacementService.click();
    await expect(bookingSystem.engineReplacementChosenService).toBeVisible();
    await expect(bookingSystem.nextStepButton).toBeVisible();
    await bookingSystem.nextStepButton.click();
    
    await expect(bookingSystem.pickDataText).toBeVisible();
    await expect(bookingSystem.calendarButton).toBeVisible();
    await expect(bookingSystem.firstAvailableDateField).toBeVisible();
    await expect(bookingSystem.pickTimeText).toBeVisible();
    await expect(bookingSystem.timeElevenField).toBeVisible();
    await bookingSystem.timeElevenField.click();
    await bookingSystem.nextStepButton.click();

    await expect(bookingSystem.contactDetailsText).toBeVisible();
    await expect(bookingSystem.vehicleDetailsText).toBeVisible();
    await expect(bookingSystem.imagesText).toBeVisible();

    await bookingSystem.fillClientContactDetails(
      process.env.CLIENTNAME as string,
      process.env.CLIENTPHONENUMBER as string,
      process.env.CLIENTEMAIL as string,
      process.env.CLIENTADDRESS as string,
      process.env.CLIENTZIPCODE as string,
      process.env.CLIENTCITY as string
    );

    await bookingSystem.fillCarDetails(
      process.env.CARREGISTRATIONNUMBER as string,
      process.env.CARMILEAGE as string,
      process.env.CARYEAR2011 as string
    );
    await bookingSystem.nextStepButton.click();

    await expect(bookingSystem.appointmentSummaryText).toHaveText("Podsumowanie");
    await expect(bookingSystem.summaryTireBalancingText).toHaveText("Wywarzenie opon");
    await expect(bookingSystem.summaryServiceEngineReplacementText).toHaveText("- Wymiana Silnika 2000,00 zł / 3,00");
    await expect(bookingSystem.summaryAppointmentDateText).toHaveText("11:00 | 26.04.2026 niedziela");
    await expect(bookingSystem.nextStepButton).toHaveText("Rezerwuj wizytę");
    await bookingSystem.nextStepButton.click();
    
    await expect(bookingSystem.successfulBookingText).toHaveText("Pomyślnie zarezerwowano termin");
    await expect(bookingSystem.successConfirmationEmailText).toHaveText("Potwierdzenie wysłaliśmy na podane przez Ciebie dane:");
    await expect(bookingSystem.nextStepButton).toHaveText("Zamknij");
    await bookingSystem.nextStepButton.click();
    await expect(bookingSystem.tiresButton).toBeVisible();
    await expect(bookingSystem.cleaningButton).toBeVisible();
  });

  test("Checking if the appointment is visible for service", async ({ page }) => {
    await page.goto("https://tpsprebeta.integra.com.pl/admin/terminarz/serwis");
    await bookingSystem.serviceLoginInputField.fill(process.env.SERVICELOGIN as string);
    await bookingSystem.servicePasswordInputField.fill(process.env.SERVICEPASSWORD as string);
    await bookingSystem.serviceLoginButton.click();
    await expect(bookingSystem.serviceCalendarTitle).toHaveText("- Kalendarz");
    await bookingSystem.serviceDatePickerButton.click();
    await bookingSystem.datePicker26Day.click();
    await expect(bookingSystem.appointmentFromTestGridCell).toHaveText("HYUNDAI i40 I Kombi Van (VF) Krystian Szuta 123456789 - Wymiana Silnika");
  });
});