import Image from "next/image";
import Flag from "./components/Flag";

export default function Home() {
  return (
    <div>
      <Flag countryCode="US" />
      <Flag countryCode="GB" />
      <Flag countryCode="FR" />
      <Flag countryCode="DE" />
      <Flag countryCode="JP" />
    </div>
  );
}
