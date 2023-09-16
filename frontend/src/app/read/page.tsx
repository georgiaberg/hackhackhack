import { redirect } from "next/navigation";

const route: React.FC<{}> = () => {
  redirect("/");
  return null;
};

export default route;
