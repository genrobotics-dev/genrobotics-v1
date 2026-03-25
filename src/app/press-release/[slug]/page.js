import { notFound } from "next/navigation";
import PressReleaseDetail from "@/components/common/resources/PressRelease/PressReleaseDetail";
import { client } from "../../../../prismicio";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    
    const page = await client.getByUID("press_release", slug).catch(() => null);
    if (page) {
        return {
            title: page.data.seo_title || page.data.title || "Press Release | Genrobotics",
            description: page.data.meta_description || page.data.summary || "",
        };
    }
    return { title: "Press Release | Genrobotics" };
}

export default async function Page({ params }) {
    const { slug } = await params;

    if (!slug) return notFound();

    const page = await client.getByUID("press_release", slug).catch(() => null);

    if (!page) {
        return notFound();
    }

    return <PressReleaseDetail pageData={page} />;
}

export async function generateStaticParams() {
    const pages = await client.getAllByType("press_release").catch(() => []);
    const params = pages.map((page) => ({ slug: page.uid }));
    // Add a fallback for the old slug that the browser is still trying to request
    // to prevent the dev server from crashing on hot-reloads.
    params.push({ slug: 'genrobotics-announces-new-milestone' });
    return params.length > 0 ? params : [{ slug: 'dummy-fallback' }];
}
