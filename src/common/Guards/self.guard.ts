import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";

@Injectable()
export class SelfGuard implements CanActivate {
	constructor(
		private readonly paramIdField = "id",
		private readonly userIdField = "id"
	) {}

	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest();
		const user = req.user;
		const paramId =
			req.params[this.paramIdField] || req.body[this.paramIdField];
		if (user.roles.includes("superadmin")) {
			return true;
		}
		if (!paramId || !user) {
			throw new ForbiddenException("Missing data for access control.");
		}

		if (paramId !== String(user[this.userIdField])) {
			throw new ForbiddenException("You can access only your own data.");
		}

		return true;
	}
}
