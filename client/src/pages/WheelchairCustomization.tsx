import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const navigationLinks = [
  { label: "Designs", href: "#designs" },
  { label: "Learn more", href: "#learn-more" },
  { label: "Support", href: "#support" },
];

export default function WheelchairCustomization() {
  const [wheelchairImage, setWheelchairImage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState({
    hipWidth: 0,
    shinLength: 0,
    measurement3: 0,
    measurement4: 0,
    measurement5: 0,
    measurement6: 0,
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
    backrestHeight: Math.round(18 * scaleFactor * 10) / 10,
    armrestLength: Math.round(12 * scaleFactor * 10) / 10,
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
            Customized Wheelchair Instructions
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl" data-testid="text-description">
            Here is the text describing the wheelchair, the process, etc.
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
                <CardTitle data-testid="text-design-name">Design Name</CardTitle>
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
                      Body measurements
                    </h3>
                    
                    <div>
                      <Label htmlFor="hip-width" className="text-sm text-gray-600 dark:text-gray-400">
                        Hip Width (in)
                      </Label>
                      <Input
                        id="hip-width"
                        type="number"
                        step="0.1"
                        value={measurements.hipWidth || ''}
                        onChange={(e) => handleMeasurementChange('hipWidth', e.target.value)}
                        className="mt-1"
                        data-testid="input-hip-width"
                      />
                    </div>

                    <div>
                      <Label htmlFor="shin-length" className="text-sm text-gray-600 dark:text-gray-400">
                        Shin Length (in)
                      </Label>
                      <Input
                        id="shin-length"
                        type="number"
                        step="0.1"
                        value={measurements.shinLength || ''}
                        onChange={(e) => handleMeasurementChange('shinLength', e.target.value)}
                        className="mt-1"
                        data-testid="input-shin-length"
                      />
                    </div>

                    <div>
                      <Label htmlFor="measurement-3" className="text-sm text-gray-600 dark:text-gray-400">
                        Measurement 3 (in)
                      </Label>
                      <Input
                        id="measurement-3"
                        type="number"
                        step="0.1"
                        value={measurements.measurement3 || ''}
                        onChange={(e) => handleMeasurementChange('measurement3', e.target.value)}
                        className="mt-1"
                        data-testid="input-measurement-3"
                      />
                    </div>
                  </div>

                  {/* Preference Measurements Column */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300" data-testid="text-preference-measurements">
                      Preference Measurements
                    </h3>

                    <div>
                      <Label htmlFor="measurement-4" className="text-sm text-gray-600 dark:text-gray-400">
                        Measurement 4 (in)
                      </Label>
                      <Input
                        id="measurement-4"
                        type="number"
                        step="0.1"
                        value={measurements.measurement4 || ''}
                        onChange={(e) => handleMeasurementChange('measurement4', e.target.value)}
                        className="mt-1"
                        data-testid="input-measurement-4"
                      />
                    </div>

                    <div>
                      <Label htmlFor="measurement-5" className="text-sm text-gray-600 dark:text-gray-400">
                        Measurement 5 (in)
                      </Label>
                      <Input
                        id="measurement-5"
                        type="number"
                        step="0.1"
                        value={measurements.measurement5 || ''}
                        onChange={(e) => handleMeasurementChange('measurement5', e.target.value)}
                        className="mt-1"
                        data-testid="input-measurement-5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="measurement-6" className="text-sm text-gray-600 dark:text-gray-400">
                        Measurement 6 (in)
                      </Label>
                      <Input
                        id="measurement-6"
                        type="number"
                        step="0.1"
                        value={measurements.measurement6 || ''}
                        onChange={(e) => handleMeasurementChange('measurement6', e.target.value)}
                        className="mt-1"
                        data-testid="input-measurement-6"
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
                    <li data-testid="text-frame-1">
                      (2) 1 14.5"x 8"x{" "}
                      <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-frame-length">
                        {dynamicMeasurements.frameLength || 0}"
                      </span>{" "}
                      tube
                    </li>
                    <li>(2) 1 x 8" tube</li>
                    <li>(2) 1 x 4" tube</li>
                    <li data-testid="text-frame-2">
                      (1) 1" x 3" x{" "}
                      <span className="font-bold text-blue-600 dark:text-blue-400" data-testid="text-dynamic-seat-width">
                        {dynamicMeasurements.seatWidth || 0}"
                      </span>{" "}
                      Steel flat Bar rectangular camber tube(s)
                    </li>
                    <li>(4) 1.5" x 1.5" x 0.065 cross bearers</li>
                    <li>(2) 1.5" x 1.5" x 10 caster mount</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Wheels</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>(2) 24" bike rims with spokes</li>
                    <li>(2) 24" bike inner tubes</li>
                    <li>(2) 24" bike tires</li>
                    <li>(2) 1 3/8" Drums hubs</li>
                    <li>(2) 1 3/8" PVC Drums hubs</li>
                    <li>(2) 1.5" PVC axle shafts</li>
                    <li>(2) 1 3/8" x 0.062 axle clamps(2)(footrest wheel center brackets)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Fasteners</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>(4 box of 3/4" wood screws)</li>
                    <li>(2 box of 1 3/8" wood screws)</li>
                    <li>(1 box of 2 1/2" wood screws)</li>
                    <li data-testid="text-fasteners-1">
                      (40) 4" x 3/16" bolts, nuts, washers (for Pony Caster brackets)
                    </li>
                    <li>(18) 7 plastic washers and screws</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Axles</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>(2) quick release lever mounts (may also come already on wheels)</li>
                    <li>(2) 4" x 9" caster bracket N/As and wheels</li>
                    <li>(2) Wheelchairs and screws</li>
                    <li>(2) 3/8" washers</li>
                    <li>(2) 3/8" or 25" wheelchair wheels</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Textiles</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>(2) Canvas seat back</li>
                    <li>(1) Yard of cloth for backrest cover</li>
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
