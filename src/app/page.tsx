import Banner from "@/components/home/Banner";
import FeaturedMenuItems from "@/components/home/FeaturedMenuItems";
import HowPizzaHubWorks from "@/components/home/HowPizzaHubWorks";
import PizzaCategories from "@/components/home/PizzaCategories";
import WhyChoosePizzaHub from "@/components/home/WhyChoosePizzaHub";

export default async function Home() {

    return (
        <div>
            <Banner />
            <FeaturedMenuItems/>
            <PizzaCategories />
            <WhyChoosePizzaHub />
            <HowPizzaHubWorks />
        </div>
    );
}