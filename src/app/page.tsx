import Banner from "@/components/home/Banner";
import HowPizzaHubWorks from "@/components/home/HowPizzaHubWorks";
import PizzaCategories from "@/components/home/PizzaCategories";
import WhyChoosePizzaHub from "@/components/home/WhyChoosePizzaHub";

export default function Home() {
    return (
        <div>
            <Banner/>
            <PizzaCategories/>
            <WhyChoosePizzaHub/>
            <HowPizzaHubWorks/>
        </div>
    );
}
