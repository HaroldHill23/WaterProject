import { useState } from "react";
import CategoryFilter from "../Components/CategoryFilter";
import WelcomeBand from "../WelcomeBand";
import ProjectList from "../Components/ProjectList";
import CartSummary from "../Components/CartSummary";

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <div className="container mt-4">
      <CartSummary/>
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
