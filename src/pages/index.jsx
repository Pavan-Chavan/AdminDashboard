import Wrapper from "@/components/layout/Wrapper";
import MainHome from "../pages/homes/home_1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function Home() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Wrapper>
        <MainHome />
      </Wrapper>
    </>
  );
}
