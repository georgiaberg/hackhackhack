import { redirect } from "next/navigation";

const route: React.FC<{}> = () => {
  redirect("/read");
  return null;
};

export default route;
