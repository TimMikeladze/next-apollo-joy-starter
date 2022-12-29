/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	Date: `scalar.Date` as const,
	DateTime: `scalar.DateTime` as const,
	EmailAddress: `scalar.EmailAddress` as const
}

export const ReturnTypes: Record<string,any> = {
	auth:{
		noError:"Boolean"
	},
	rateLimit:{
		limit:"Int",
		duration:"Int"
	},
	Date: `scalar.Date` as const,
	DateTime: `scalar.DateTime` as const,
	EmailAddress: `scalar.EmailAddress` as const,
	AppVersion:{
		commit:"String",
		version:"String"
	},
	User:{
		email:"EmailAddress",
		image:"String",
		displayName:"String"
	},
	Query:{
		signedInUser:"User",
		appVersion:"AppVersion"
	}
}

export const Ops = {
query: "Query" as const
}