const isDowntime = () => process.env.NEXT_PUBLIC_DOWNTIME === `true`;

export default isDowntime;
