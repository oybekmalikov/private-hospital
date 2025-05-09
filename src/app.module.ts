import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminsModule } from "./admins/admins.module";
import { Admin } from "./admins/models/admin.models";
import { AppointmentsModule } from "./appointments/appointments.module";
import { Appointment } from "./appointments/models/appointment.model";
import { DepartmentsModule } from "./departments/departments.module";
import { Department } from "./departments/models/department.model";
import { DoctorsModule } from "./doctors/doctors.module";
import { Doctor } from "./doctors/models/doctor.model";
import { HservicesModule } from "./hservices/hservices.module";
import { HService } from "./hservices/models/hservice.model";
import { LabModule } from "./lab/lab.module";
import { Lab } from "./lab/models/lab.model";
import { MedHistoryModule } from "./med_history/med_history.module";
import { MedHistory } from "./med_history/models/med_history.model";
import { MedPrescriptionModule } from "./med_prescription/med_prescription.module";
import { MedPrescription } from "./med_prescription/models/med_prescription.model";
import { MedicalRecordsModule } from "./medical_records/medical_records.module";
import { MedicalRecord } from "./medical_records/models/medical_record.model";
import { MedicineCategoriesModule } from "./medicine_categories/medicine_categories.module";
import { MedicineCategory } from "./medicine_categories/models/medicine_category.model";
import { MedicinesModule } from "./medicines/medicines.module";
import { Medicine } from "./medicines/models/medicine.model";
import { PatientAdmission } from "./patient_admissions/models/patient_admission.model";
import { PatientAdmissionsModule } from "./patient_admissions/patient_admissions.module";
import { Patient } from "./patients/models/patient.model";
import { PatientsModule } from "./patients/patients.module";
import { Payment } from "./payments/models/payment.model";
import { PaymentsModule } from "./payments/payments.module";
import { RoomType } from "./room_types/models/room_type.model";
import { RoomTypesModule } from "./room_types/room_types.module";
import { Room } from "./rooms/models/room.model";
import { RoomsModule } from "./rooms/rooms.module";
import { Schedule } from "./schedules/models/schedule.model";
import { SchedulesModule } from "./schedules/schedules.module";
import { Staff } from "./staffs/models/staff.model";
import { StaffsModule } from "./staffs/staffs.module";
import { AuthPatientsModule } from './auth_patients/auth_patients.module';
import { AuthStaffsModule } from './auth_staffs/auth_staffs.module';
import { AuthDoctorsModule } from './auth_doctors/auth_doctors.module';
import { AuthAdminsModule } from './auth_admins/auth_admins.module';
import { MailModule } from './mail/mail.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
		SequelizeModule.forRoot({
			dialect: "postgres",
			port: Number(process.env.PG_PORT),
			host: process.env.PG_HOST,
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
			models: [
				Admin,
				Staff,
				Department,
				Doctor,
				Patient,
				RoomType,
				Room,
				PatientAdmission,
				Lab,
				Appointment,
				Schedule,
				HService,
				Payment,
				MedicalRecord,
				MedPrescription,
				Medicine,
				MedicineCategory,
				MedHistory,
			],
			autoLoadModels: true,
			sync: { alter: true },
			logging: false,
		}),
		AdminsModule,
		StaffsModule,
		DepartmentsModule,
		DoctorsModule,
		PatientsModule,
		RoomTypesModule,
		RoomsModule,
		PatientAdmissionsModule,
		LabModule,
		AppointmentsModule,
		SchedulesModule,
		HservicesModule,
		PaymentsModule,
		MedicalRecordsModule,
		MedPrescriptionModule,
		MedicinesModule,
		MedicineCategoriesModule,
		MedHistoryModule,
		AuthPatientsModule,
		AuthStaffsModule,
		AuthDoctorsModule,
		AuthAdminsModule,
		MailModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
