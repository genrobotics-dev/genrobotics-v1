import ResourcesIntro from "@/components/common/resources/ResourcesIntro";
import ResourcesList from "@/components/common/resources/ResourcesList";
import ScrollIndicator from "@/components/common/ScrollIndicator";
import { client } from "../../../prismicio";

export async function generateMetadata() {
    return {
        title: "Press Release | Genrobotics",
        description: "Explore the latest press releases and news from Genrobotics.",
    };
}

export default async function PressReleasePage() {
    const pressReleases = await client.getAllByType("press_release", {
        orderings: [{ field: "document.first_publication_date", direction: "desc" }]
    });

    return (
        <main className="relative w-full overflow-x-hidden">
            <ResourcesIntro
                title="Our"
                highlight="Press Release"
                description="Explore the latest announcements and press releases from Genrobotics."
            >
                <ScrollIndicator />
            </ResourcesIntro>
            
            <div className="relative z-20 pt-[100vh] container mx-auto">
                <ResourcesList items={pressReleases} />
            </div>
        </main>
    );
}
