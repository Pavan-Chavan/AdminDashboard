import Wrapper from "@/components/layout/Wrapper";
import MainHome from "../pages/homes/home_1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Jio Kheti - अन्नदाता सुखी भव:",
  description: "Jio Kheti - अन्नदाता सुखी भव:",
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
