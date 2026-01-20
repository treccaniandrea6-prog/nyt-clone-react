import { useParams } from "react-router-dom";
import NewsListPage from "./NewsListPage";

function Section() {
  const { sectionId } = useParams();
  return <NewsListPage section={sectionId} />;
}

export default Section;