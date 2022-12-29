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
	Date: `scalar.Date` as const,
	DateTime: `scalar.DateTime` as const,
	EmailAddress: `scalar.EmailAddress` as const,
	User:{
		email:"EmailAddress",
		image:"String",
		displayName:"String"
	},
	Query:{
		signedInUser:"User"
	}
}

export const Ops = {
query: "Query" as const
}