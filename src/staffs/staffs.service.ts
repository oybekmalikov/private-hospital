import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Staff } from "./models/staff.model";
@Injectable()
export class StaffsService {
	constructor(@InjectModel(Staff) private readonly staffModel: typeof Staff) {}
	async create(createStaffDto: CreateStaffDto) {
		const condidate = await this.findByEmail(createStaffDto.email);
		if (condidate) {
			throw new ConflictException(`${createStaffDto.email} already exists`);
		}
		const hashshedPassword = await bcrypt.hash(createStaffDto.password, 7);
		const newStaff = this.staffModel.create({
			...createStaffDto,
			password: hashshedPassword,
		});
		return newStaff;
	}

	findAll() {
		return this.staffModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.staffModel.findByPk(id, { include: { all: true } });
	}
	findByEmail(email: string) {
		return this.staffModel.findOne({ where: { email } });
	}
	update(id: number, updateStaffDto: UpdateStaffDto) {
		return this.staffModel.update(updateStaffDto, { where: { id } });
	}

	remove(id: number) {
		return this.staffModel.destroy({ where: { id } });
	}
	async updateRefreshToken(staffId: number, refreshToken: string) {
		const updatedStaff = this.staffModel.update(
			{
				refresh_token: refreshToken,
			},
			{ where: { id: staffId } }
		);
		return updatedStaff;
	}
}
