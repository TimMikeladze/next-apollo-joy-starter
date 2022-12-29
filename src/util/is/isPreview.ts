const isPreview = () => process.env.NEXT_PUBLIC_VERCEL_ENV === `preview`;

export default isPreview;
