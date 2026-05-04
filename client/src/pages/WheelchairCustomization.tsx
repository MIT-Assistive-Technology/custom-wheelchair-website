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
import instructionPDF from "@/pages/custom-wheelchair-website-Ply_Guy_Instructions.pdf";
import { PDFDocument } from 'pdf-lib'
import { Upload } from "lucide-react";

const navigationLinks = [
  { label: "Learn more", href: "#learn-more" },
  { label: "Support", href: "#support" },
];


// WheelchairCustomization Components: inputs from user in form boxes
export default function Design1() {
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
      < main className="max-w-7xl mx-auto px-8 py-12" >
        {/* Title and Description */}
        < div className="mb-8" >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-title">
            Welcome!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl" data-testid="text-description">
            This tool was created by MIT Assistive Technology and our co-designer, Erik Kondo. We are a club that aims to make assistive technology more accessible and customizable for everyone.


            Use this tool to customize your wheelchair designs based on user measurements. This helps you design customized wheelchairs from different materials and for different purposes. Several of these designs are courtesy of OpenSourceWheelchairs and designer Erik Kondo, who have designed many wheelchairs for all types of needs.
          </p>
        </div >

        {/* Smaller Wheelchair Image (full width on top) */}
        < div className="mb-12 flex justify-center" >
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
        </div >

        {/* Page Navigation Table */}
        < div className="mb-12" >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Explore Designs
          </h2>


          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <tbody>


                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-4 text-gray-600">
                    Available Designs
                  </td>


                  <td className="p-4 text-gray-600">
                    Materials
                  </td>
                </tr>


                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-4">
                    <a href="/design1" className="text-blue-600 hover:underline">
                      Ply Guy Active Wheelchair
                    </a>
                  </td>
                  <td className="p-4 text-gray-600">
                    Wood
                  </td>
                </tr>


                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-4">
                    <a href="/design2" className="text-blue-600 hover:underline">
                      Design Name #2
                    </a>
                  </td>
                  <td className="p-4 text-gray-600">
                    PVC
                  </td>
                </tr>


                <tr>
                  <td className="p-4">
                    <a href="/design3" className="text-blue-600 hover:underline">
                      Design Name #3
                    </a>
                  </td>
                  <td className="p-4 text-gray-600">
                    Lego
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div >

      </main >
    </div >

  );
}
