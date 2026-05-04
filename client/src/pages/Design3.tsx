import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent
} from "@/components/ui/navigation-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import wheelchairImg from "@/pages/20250702_181035.avif";
import ATLogo from "@/pages/MITATLogo.png";
import { PDFDocument } from 'pdf-lib'
import { Upload } from "lucide-react";

const navigationLinks = [
    { label: "Learn more", href: "#learn-more" },
    { label: "Support", href: "#support" },
];



// WheelchairCustomization Components: inputs from user in form boxes
export default function Design3() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [wheelchairImage, setWheelchairImage] = useState<string | null>(null);
    const [measurements, setMeasurements] = useState({
        hipWidth: 15,
        seatDepth: 16,
        backrestDesiredHeight: 14.25,
        sideGuardHeight: 8,
        shinLength: 15,
        frontFootplateDist: 4,
        upperChassisLength: 20,
        footSupportLength: 7,
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setWheelchairImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMeasurementChange = (field: string, value: string) => {
        setMeasurements(prev => ({
            ...prev,
            [field]: parseFloat(value) || 0,
        }));
    };

    // Calculate dynamic measurements based on hip width
    const dynamicMeasurements = {

        backrestSupport: 5 + (measurements.backrestDesiredHeight),

        footplateSectionLength: (measurements.hipWidth) - 4.75,
        camberTubeLength: (measurements.hipWidth) + 1.5,
        seatPanWidth: (measurements.hipWidth),
        seatPanDepth: (measurements.seatDepth),
        backrestHeight: (measurements.backrestDesiredHeight),
        frontFootplateDist: (measurements.frontFootplateDist),
        upperChassisLength: (measurements.seatDepth) + measurements.frontFootplateDist,
        footSupportLength: (measurements.shinLength) - 8,
    };


    // Helper function for downloading
    const downloadBlob = (url: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Creates a downloadable file with the changes given user input
    const handleModifyPdf = async () => {
        try {
            const existingPdfBytes = await fetch("/wheelchair_instructions.pdf")
                .then(res => {
                    if (!res.ok) throw new Error('Failed to load PDF template');
                    return res.arrayBuffer();
                });

            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();

            // All the text fields
            const upperField = form.getTextField('upper_chassis');
            upperField.setText(`${dynamicMeasurements.upperChassisLength.toString()}"`);

            const backrestField = form.getTextField('backrest_support');
            backrestField.setText(`${dynamicMeasurements.backrestSupport.toString()}"`);

            const footplateField = form.getTextField('footplate_sections');
            footplateField.setText(`${dynamicMeasurements.footplateSectionLength.toString()}"`);

            const seatpan1Field = form.getTextField('seat_pan1');
            seatpan1Field.setText(`${dynamicMeasurements.seatPanWidth.toString()}"`);

            const seatpan2Field = form.getTextField('seat_pan2');
            seatpan2Field.setText(`${dynamicMeasurements.seatPanDepth.toString()}"`);

            const backrest1Field = form.getTextField('backrest1');
            backrest1Field.setText(`${dynamicMeasurements.backrestHeight.toString()}"`);

            const backrest2Field = form.getTextField('backrest2');
            backrest2Field.setText(`${dynamicMeasurements.seatPanWidth.toString()}"`);

            const footplate_supportsField = form.getTextField('footplate_supports');
            footplate_supportsField.setText(`${dynamicMeasurements.footSupportLength.toString()}"`);

            const lowcamberField = form.getTextField('lower_camber');
            lowcamberField.setText(`${dynamicMeasurements.camberTubeLength.toString()}"`);

            const highcamberField = form.getTextField('upper_camber');
            highcamberField.setText(`${dynamicMeasurements.camberTubeLength.toString()}"`);

            const fields = form.getFields();
            console.log("FIELDS:", fields.map(f => f.getName()));


            const pdfBytes = await pdfDoc.save();

            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            setPdfUrl(url);
            downloadBlob(url, "custom_wheelchair_instructions.pdf");



        } catch (error) {
            console.error("Error modifying PDF:", error);
            alert("Could not generate PDF. Make sure wheelchair_instructions.pdf is in /public.");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="/">
                        <div className="flex items-center gap-2">
                            < div className="flex justify-center" >
                                <Card className="w-full max-w-xl">
                                    <CardContent className="p-1">
                                        <img
                                            src={ATLogo}
                                            // alt="Wheelchair Illustration"
                                            className="w-12 h-12"
                                        // data-testid="img-wheelchair-illustration"
                                        />
                                    </CardContent>
                                </Card>
                            </div >
                            <div className="font-normal text-black dark:text-white text-xl tracking-[-0.40px]">
                                MIT Assistive Technology
                            </div>
                        </div>
                    </a>
                    <nav className="flex items-center gap-8">
                        <NavigationMenu>
                            <NavigationMenuList className="flex-col items-start space-x-0 space-y-2 ">
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Designs</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        {/* className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2" */}
                                        <ul className="w-[400px]">
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a href="/design1" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                                        <div className="text-sm font-medium">Ply Guy Active Wheelchair</div>
                                                        <p className="text-sm text-muted-foreground">Wheelchair type 1</p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a href="/design2" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                                        <div className="text-sm font-medium">Design 2</div>
                                                        <p className="text-sm text-muted-foreground">Wheelchair type 2</p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a href="/design3" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                                        <div className="text-sm font-medium">Design 3</div>
                                                        <p className="text-sm text-muted-foreground">Wheelchair type 3</p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        {navigationLinks.map((link) => (
                            <Button
                                key={link.label}
                                variant="ghost"
                                className="font-medium text-gray-600 dark:text-gray-300 text-base hover:bg-transparent hover:text-black dark:hover:text-white"
                                asChild
                            >
                                <a href={link.href}>{link.label}</a>
                            </Button>
                        ))}
                    </nav>
                </div>
            </header>


            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-8 py-12">
                {/* Title and Description */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-title">
                        Design 3
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl" data-testid="text-description">
                        Use this tool to customize your wheelchair designs based on user measurements. This helps you design a customized Ply Guy Active Wheelchair, courtesy of OpenSourceWheelchairs and designer Erik Kondo.
                    </p>
                </div>

                {/* Simulation would go here on the left side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <Card className="w-full max-w-xl">
                        <CardContent className="p-4">
                            <img
                                src={wheelchairImg}
                                alt="Wheelchair Illustration"
                                className="w-full h-auto rounded-lg"
                                data-testid="img-wheelchair-illustration"
                            />
                        </CardContent>
                    </Card>

                    {/* Right side of the layout */}
                    {/* RIGHT SIDE */}
                    <Card className="w-full max-w-xl">
                        <CardHeader>
                            <CardTitle>Ply Guy Active Wheelchair</CardTitle>
                            <a
                                href="https://www.opensourcewheelchairs.org/_files/ugd/d9ae66_cc59f398e09642ca907d965fccbca107.pdf"
                                className="text-blue-500 hover:text-blue-600 text-sm"
                            >
                                Link to instructions without customization
                            </a>
                        </CardHeader>
                        {/* "mb-12 flex justify-center" */}
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-6">

                                {/* LEFT COLUMN INPUTS */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-sm">Key Body Measurements</h3>

                                    <div>
                                        <Label>Hip Width (in)</Label>
                                        <Input
                                            type="number"
                                            step="0.5"
                                            value={measurements.hipWidth}
                                            onChange={(e) => handleMeasurementChange("hipWidth", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>Seat Depth (in)</Label>
                                        <Input
                                            type="number"
                                            step="0.25"
                                            value={measurements.seatDepth}
                                            onChange={(e) => handleMeasurementChange("seatDepth", e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* RIGHT COLUMN INPUTS */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-sm">Preferences</h3>

                                    <div>
                                        <Label>Backrest Height (in)</Label>
                                        <Input
                                            type="number"
                                            step="0.25"
                                            value={measurements.backrestDesiredHeight}
                                            onChange={(e) => handleMeasurementChange("backrestDesiredHeight", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>Side Guard Height (in)</Label>
                                        <Input
                                            type="number"
                                            step="0.25"
                                            value={measurements.sideGuardHeight}
                                            onChange={(e) => handleMeasurementChange("sideGuardHeight", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>Shin Length (in)</Label>
                                        <Input
                                            type="number"
                                            step="0.25"
                                            value={measurements.shinLength}
                                            onChange={(e) => handleMeasurementChange("shinLength", e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label>Front Footplate Distance (in)</Label>
                                        <Input
                                            type="number"
                                            step="0.25"
                                            value={measurements.frontFootplateDist}
                                            onChange={(e) => handleMeasurementChange("frontFootplateDist", e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>



                {/* Instructions at the bottom with frame and wooden parts of left and pre-fabricated parts and tools on right*/}
                <div className="mb-12 flex justify-center w-full">

                    {/* LEFT SIDE */}
                    <Card className="w-full max-w-8xl">
                        <CardHeader>
                            <CardTitle className="text-2xl" data-testid="text-instructions-title">
                                Instructions
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6">

                            {/* Parts List */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
                                    Parts
                                </h3>

                                <div className="grid grid-cols-1 md: grid-cols-2 gap-x-12 gap-y-8">
                                    <div className="space-y-4">

                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Frame</h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                                <li>(1) 2” x 4”x 6’ Wood Stud</li>
                                                <li>(1) 2” x 4” x ½” Piece of Plywood (Cabinet Grade)</li>
                                                <li>(1) 2” x 4” x ¼” Piece of Plywood (Cabinet Grade)</li>
                                                <li>(2) 3” x 1.25” Punched Zinc Square Tubes</li>
                                                <li>(4) 3”x 1” Punched Zinc Square Tubes</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Wooden Parts</h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">

                                                <li>
                                                    <strong><em>From 2” x 4” x 6’ Stud</em></strong>
                                                    <ul className="list-disc list-inside ml-6">

                                                        <li>
                                                            Upper Chassis - 2” x 2” x{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.upperChassisLength}"
                                                            </span>
                                                        </li>

                                                        <li>
                                                            Backrest Support - 2” x 2” x{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.backrestSupport}"
                                                            </span>
                                                        </li>

                                                        <li>
                                                            Footplate Sections - 2” x 2” x{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.footplateSectionLength}"
                                                            </span>
                                                        </li>

                                                        <li>Foot Support Blocks - 2” x 4” x 4”</li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <strong><em>From 2” x 4” x ½” Plywood</em></strong>
                                                    <ul className="list-disc list-inside ml-7">

                                                        <li>
                                                            Footplate Supports –{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.footSupportLength}"
                                                            </span>{" "}
                                                            x 4” x ½”
                                                        </li>

                                                        <li>
                                                            Lower Camber Tube Board – 3” x{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.camberTubeLength}"
                                                            </span>{" "}
                                                            x ½”
                                                        </li>

                                                        <li>
                                                            Upper Camber Tube Board – 3” x{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.camberTubeLength}"
                                                            </span>{" "}
                                                            x ½”
                                                        </li>

                                                    </ul>
                                                </li>

                                                <li>
                                                    <strong><em>From 2” x 4” x ¼” Plywood</em></strong>
                                                    <ul className="list-disc list-inside ml-8">
                                                        <li>
                                                            Seat Pan —{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.seatPanWidth}"
                                                            </span>{" "}
                                                            x{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.seatPanDepth}"
                                                            </span>{" "}
                                                            x ½”
                                                        </li>

                                                        <li>
                                                            Backrest —{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.backrestHeight}"
                                                            </span>{" "}
                                                            x{" "}
                                                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                                                {dynamicMeasurements.seatPanWidth}"
                                                            </span>{" "}
                                                            x ½”
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Right side */}

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Pre-Fabricated Parts</h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                                <li>(2) Drive Wheels</li>
                                                <li>(2) Caster Forks & 4” Wheels</li>
                                                <li>(2) Wheel-locks and Mounts</li>
                                                <li>(2) Axle Receivers</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Tools</h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                                <li>Hand clamps</li>
                                                <li>Measuring Square</li>
                                                <li>Drill</li>
                                                <li>Wrench</li>
                                                <li>Wood Screws</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>



                </div>

                <div className="flex flex-col items-center gap-4 mb-12">
                    <Button
                        size="lg"
                        onClick={handleModifyPdf}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Generate Customized PDF
                    </Button>
                    <p className="text-sm text-gray-500">
                        This will apply your measurements to the assembly instructions.
                    </p>
                </div>

                {/* PDF Embed Section */}
                <Card className="mt-12">
                    <CardHeader>
                        <CardTitle className="text-2xl">Instruction PDF</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <iframe
                            key={pdfUrl}
                            src={pdfUrl || "/wheelchair_instructions.pdf"}
                            title="Ply Guy Wheelchair Instructions"
                            width="100%"
                            height="600px"
                            className="border rounded-lg"
                        />
                    </CardContent>
                </Card>

            </main>
        </div>

    );
}
