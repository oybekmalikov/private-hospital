import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";

@Injectable()
export class AccessControlGuard implements CanActivate {
	constructor(
		private readonly accessMatrix: Record<string, string[]>,
		private readonly resource: string
	) {}

	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest();
		const user = req.user;
		if (!user || !user.roles) {
			throw new ForbiddenException("User not authenticated.");
		}
		const allowedRoles = this.accessMatrix[this.resource] || [];
		const hasAccess = allowedRoles.some((role) => user.roles.includes(role));
		if (!hasAccess) {
			throw new ForbiddenException("Access denied to this resource.");
		}
		return true;
	}
}
