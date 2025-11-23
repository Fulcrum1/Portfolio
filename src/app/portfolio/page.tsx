import Experciences from "../components/Portfolio/Experciences";
import Projects from "../components/Portfolio/Projects";
import Skills from "../components/Portfolio/Skills";
import { Progress } from "@/components/ui/progress"

export default function Portfolio() {
    const progress = 50;

    return (
        <div className="flex flex-col gap-4">
            {/* <div className="flex justify-center">
                <Progress value={progress} />
            </div> */}
            <Experciences />
            <Projects />
            <Skills />
        </div>
    )
}