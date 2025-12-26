import Image from "next/image";

const Flag = ({ countryCode }: { countryCode: string }) => {
  return (
    <Image
      src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
      width={24}
      height={16}
      alt={`${countryCode} flag`}
      priority={false} // Use true for top-of-page matches
    />
  );
};

export default Flag;
