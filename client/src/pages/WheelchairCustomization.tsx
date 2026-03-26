import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import wheelchairImg from "@/pages/20250702_181035.avif";
import instructionPDF from "@/pages/custom-wheelchair-website-Ply_Guy_Instructions.pdf";
import { Upload } from "lucide-react";
import Design1 from "@/pages/Design1"

const navigationLinks = [
  { label: "Designs", href: "/design1" },
  { label: "Learn more", href: "#learn-more" },
  { label: "Support", href: "#support" },
];

// WheelchairCustomization Components: inputs from user in form boxes
export default function WheelchairCustomization() {
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700" />
            <div className="font-normal text-black dark:text-white text-xl tracking-[-0.40px]">
              MIT Assistive Technology
            </div>
          </div>

          <nav className="flex items-center gap-8">
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
            Wheelchair Customization
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl" data-testid="text-description">
            Use this tool to customize your wheelchair designs based on user measurements. This helps you design a customized Ply Guy Active Wheelchair, courtesy of OpenSourceWheelchairs and designer Erik Kondo.
          </p>
        </div>

        {/* Smaller Wheelchair Image (full width on top) */}
        <div className="mb-12 flex justify-center">
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
        </div>

        {/* Instructions (left) + Measurements Form (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* LEFT SIDE */}
          <Card>
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
            </CardContent>
          </Card>

          {/* RIGHT SIDE */}
          <Card>
            <CardHeader>
              <CardTitle>Ply Guy Active Wheelchair</CardTitle>
              <a
                href="https://www.opensourcewheelchairs.org/_files/ugd/d9ae66_cc59f398e09642ca907d965fccbca107.pdf"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                Link to instructions without customization
              </a>
            </CardHeader>

            <CardContent>
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

        {/* PDF Embed Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">Instruction PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              src={instructionPDF}
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
