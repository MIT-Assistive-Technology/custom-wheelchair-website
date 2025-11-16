import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const navigationLinks = [
  { label: "Designs", href: "#designs" },
  //{ label: "Learn more", href: "#learn-more" },
  //{ label: "Support", href: "#support" },
];

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
  const scaleFactor = measurements.hipWidth / 14; // Base scale factor
  const dynamicMeasurements = {
    frameLength: Math.round(14.5 * scaleFactor * 10) / 10,
    seatWidth: Math.round(14 * scaleFactor * 10) / 10,
    armrestLength: Math.round(12 * scaleFactor * 10) / 10,
    backrestSupport: 5+(measurements.backrestDesiredHeight),

    footplateSectionLength: (measurements.hipWidth)-4.75,
    camberTubeLength: (measurements.hipWidth)+1.5,
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Wheelchair Image Upload */}
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  {wheelchairImage ? (
                    <img
                      src={wheelchairImage}
                      alt="Wheelchair"
                      className="w-full h-full object-cover"
                      data-testid="img-wheelchair"
                    />
                  ) : (
                    <label
                      htmlFor="wheelchair-upload"
                      className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                      data-testid="label-upload"
                    >
                      <Upload className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                      <span className="text-gray-500 dark:text-gray-400">Click to upload wheelchair image</span>
                      <input
                        id="wheelchair-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        data-testid="input-wheelchair-upload"
                      />
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Measurements Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-design-name">Ply Guy Active Wheelchair</CardTitle>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 text-sm"
                  data-testid="link-instructions"
                >
                  Link to instructions without customization
                </a>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {/* Body Measurements Column */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300" data-testid="text-body-measurements">
                      Key Body Measurements
                    </h3>

                    <div>
                      <Label htmlFor="hip-width" className="text-sm text-gray-600 dark:text-gray-400">
                        Hip Width (in)
                      </Label>
                      <Input
                        id="hip-width"
                        type="number"
                        step="0.5"
                        value={measurements.hipWidth || ''}
                        onChange={(e) => handleMeasurementChange('hipWidth', e.target.value)}
                        className="mt-1"
                        data-testid="input-hip-width"
                      />
                    </div>

                    <div>
                      <Label htmlFor="seatDepth" className="text-sm text-gray-600 dark:text-gray-400">
                        Seat Depth (in)
                      </Label>
                      <Input
                        id="seatDepth"
                        type="number"
                        step="0.25"
                        value={measurements.seatDepth || ''}
                        onChange={(e) => handleMeasurementChange('seatDepth', e.target.value)}
                        className="mt-1"
                        data-testid="input-seatDepth"
                      />
                    </div>

                  </div>

                  {/* Preference Measurements Column */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300" data-testid="text-preference-measurements">
                      Preference Measurements
                    </h3>

                    <div>
                      <Label htmlFor="backrestDesiredHeight" className="text-sm text-gray-600 dark:text-gray-400">
                        Backrest Height (in)
                      </Label>
                      <Input
                        id="backrestDesiredHeight"
                        type="number"
                        step="0.25"
                        value={measurements.backrestDesiredHeight || ''}
                        onChange={(e) => handleMeasurementChange('backrestDesiredHeight', e.target.value)}
                        className="mt-1"
                        data-testid="input-backrestDesiredHeight"
                      />
                    </div>

                    <div>
                      <Label htmlFor="sideGuardHeight" className="text-sm text-gray-600 dark:text-gray-400">
                        Side Guard Height (in)
                      </Label>
                      <Input
                        id="sideGuardHeight"
                        type="number"
                        step="0.25"
                        value={measurements.sideGuardHeight || ''}
                        onChange={(e) => handleMeasurementChange('sideGuardHeight', e.target.value)}
                        className="mt-1"
                        data-testid="input-sideGuardHeight"
                      />
                    </div>

                    <div>
                      <Label htmlFor="shinLength" className="text-sm text-gray-600 dark:text-gray-400">
                        Shin Length (distance from seatpan to footrest) (in)
                      </Label>
                      <Input
                        id="shinLength"
                        type="number"
                        step="0.25"
                        value={measurements.shinLength || ''}
                        onChange={(e) => handleMeasurementChange('shinLength', e.target.value)}
                        className="mt-1"
                        data-testid="input-shinLength"
                      />
                    </div>

                    <div>
                      <Label htmlFor="frontFootplateDist" className="text-sm text-gray-600 dark:text-gray-400">
                        Distance from seatpan to front of footplate (in)
                      </Label>
                      <Input
                        id="frontFootplateDist"
                        type="number"
                        step="0.25"
                        value={measurements.frontFootplateDist || ''}
                        onChange={(e) => handleMeasurementChange('frontFootplateDist', e.target.value)}
                        className="mt-1"
                        data-testid="input-frontFootplateDist"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>




        {/* Instructions Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl" data-testid="text-instructions-title">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Parts List */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white" data-testid="text-parts-title">Parts</h3>

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

                        <li data-testid="text-frame-0">
                        Upper Chassis - 2” x 2” x {" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-upper-chassis">
                          {dynamicMeasurements.upperChassisLength || 0}"
                          </span>{" "}
                        </li>
                        <li data-testid="text-frame-1">
                        Backrest Support - 2” x 2” x{" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-backrest-support">
                          {dynamicMeasurements.backrestSupport || 0}"
                          </span>{" "}
                        {/*tube*/}
                        </li>

                        <li data-testid="text-frame-2">
                        Footplate Sections - 2” x 2” x{" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-footplate-sections">
                          {dynamicMeasurements.footplateSectionLength || 0}"
                          </span>{" "}
                        </li>

                        <li>Foot Support Blocks - 2” x 4” x 4”</li>
                      </ul>
                    </li>


                    <li>
                      <strong><em>From 2” x 4” x ½” Plywood</em></strong>
                      <ul className="list-disc list-inside ml-7">

                        <li data-testid="text-frame-2.5">
                          Footplate Supports –
                          {" "}
                          <span
                            className="font-bold text-blue-600 dark:text-blue-400"
                            data-testid="text-dynamic-footsupport-length"
                          >
                            {dynamicMeasurements.footSupportLength || 0}"
                          </span>
                          {" "} x 4” x ½”
                      </li>
                        <li data-testid="text-frame-3">
                            Lower Camber Tube Board – 3” x{" "}
                            <span
                              className="font-bold text-blue-600 dark:text-blue-400"
                              data-testid="text-dynamic-lcamber-tube-length"
                            >
                              {dynamicMeasurements.camberTubeLength || 0}"
                            </span>{" "}
                            x ½”
                          </li>

                        <li data-testid="text-frame-4">
                            Upper Camber Tube Board - 3” x{" "}
                            <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-ucamber-tube-length">
                            {dynamicMeasurements.camberTubeLength || 0}"
                            </span>{" "}
                            x ½”
                        </li>

                        <li>Outer Corner Brackets -</li>
                        <li>Inside Corner Brackets -</li>
                        <li>Front Side Supports -</li>

                      </ul>
                    </li>


                    <li>
                      <strong><em>From 2” x 4” x ¼” Plywood</em></strong>
                      <ul className="list-disc list-inside ml-8">
                        <li data-testid="text-frame-5">
                        Seat Pan - {" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-seat-pan-width">
                          {dynamicMeasurements.seatPanWidth || 0}"
                          </span>{" "}
                        x{" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-seat-pan-depth">
                          {dynamicMeasurements.seatPanDepth || 0}"
                          </span>{" "}
                          x ½”
                        </li>

                        <li data-testid="text-frame-6">
                        Backrest - {" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-backrest-height">
                          {dynamicMeasurements.backrestHeight || 0}"
                          </span>{" "}
                        x{" "}
                          <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-backrest-width">
                          {dynamicMeasurements.seatPanWidth || 0}"
                          </span>{" "}
                          x ½”
                        </li>

                        <li>Side Guards -</li>

                      </ul>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Pre-Fabricated Wheelchair Parts</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>(2) Drive Wheels</li>
                    <li>(2) Caster Forks and 4” Wheels</li>
                    <li>(2) Wheel-locks and Mounts</li>
                    <li>(2) Axle Receivers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Fasteners</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>(4) 3” x 5/16” Hex Bolts, Washers, Nuts</li>
                    <li>(4) 5”x 5/16” Hex bolts, Washers, Nuts</li>
                    <li>(1) Box of 100 Wood Screws</li>
                    <li>(1) Medium Strength Loctite</li>
                    {/*
                    <li data-testid="text-fasteners-1">
                      (40) 4" x 3/16" bolts, nuts, washers (for Pony Caster brackets)
                    </li>
                      */}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Tools</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>(1) ½” Diameter Rod</li>
                    <li>(2) Hand Clamps</li>
                    <li>(1) Measuring Square</li>
                    <li>(1) Yardstick (or Measuring Tape)</li>
                    <li>Screwdriver</li>
                    <li>Wrench</li>
                    <li>Allen Wrench</li>
                    <li>Drill</li>
                  </ul>
                </div>



              </div>
            </div>

            {/* Assembly Instructions */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white" data-testid="text-assembly-title">Assembly</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl. Quisque maximus mattis mis mi.</li>
                <li>Aliquam imperdiet mi ac orci elementum fermentum. Maecam pellentus mauris ac amet orci. Aliquam volutpat mi ac lorem hendrerit.</li>
                <li>Nunc tristique lacus et metus. Maecenas feugiat lectus et mi. Aenean tincidunt lorem in turpis.</li>
                <li>Praesent egestas massa ut ex rutrum fermentum.</li>
                <li>Praesent egestur massa ut ex rutrum fermentum. Praesam pellentus mauris et amet orci. Aliquam volutpat mi ac lorem hendrerit.</li>
                <li>Vivamus pellentesque lorem in turpis. Suspendisse maximus mauris et. Praesent volutpat mi ac lorem hendrerit.</li>
                <li>Lorem in justo a sem viverra tincidunt. Cras mauris. Suspendisse potenti.</li>
                <li>Nunc tristique lacus et metus. Maecenas feugiat lectus et mi. Praesant maximus mauris in amet et commodo a lorem hendrerit.</li>
                <li>Mauris in justo a sem viverra tincidunt. Cras mauris. Suspendisse potenti.</li>
                <li>Maecenas tristique lacus et metus. Maecenas feugiat lectus lacus et mi. Aenean tincidunt lorem in turpis.</li>
                <li>Nunc maximus lacus et metus. Aenean tincidunt tincidunt lorem in turpis. Praesant maximus mauris in amet et commodo a lorem hendrerit.</li>
                <li>Praesant ultrices massa vel in. Donec a lacus. Cras mauris feugiat ligula vitae massa hendrerit vulputate ac. Suspendisse potenti maximus mauris.</li>
                <li>Phasellus ultricies massa quis nisl. Donec a lacus. Cras mauris fermentum ligula pulvinar massa hendrerit volutpat ac turpis imperdiet mi volutpat cursus. Praesent mauris volutpat cursus Suspendisse potenti maximus mauris sed non a sodales sit amet.</li>
              </ol>
            </div>

            {/* Visual Assembly Guide Placeholder */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mt-6">
              <p className="text-center text-gray-600 dark:text-gray-400" data-testid="text-assembly-guide">
                Visual assembly guide with step-by-step images would appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
