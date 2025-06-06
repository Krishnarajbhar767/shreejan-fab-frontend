"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, Filter, RotateCcw } from "lucide-react";

// Enhanced SidebarFilter Component with premium UI and better mobile experience
function SidebarFilter({ onFilterChange, isOpen, toggleSidebar }) {
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [fabric, setFabric] = useState("");
    const [color, setColor] = useState("");
    const [technique, setTechnique] = useState("");

    const [openSections, setOpenSections] = useState({
        price: true,
        fabric: true,
        color: true,
        technique: true,
    });

    // Calculate active filter count
    const activeFilters = [
        priceRange[0] !== 0 || priceRange[1] !== 200000,
        fabric !== "",
        color !== "",
        technique !== "",
    ].filter(Boolean).length;

    // Toggle accordion section
    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // Handle applying filters
    const handleApplyFilters = () => {
        onFilterChange({ priceRange, fabric, color, technique });
        if (isOpen && toggleSidebar) toggleSidebar();
    };

    // Handle clearing filters
    const handleClearFilters = () => {
        setPriceRange([0, 200000]);
        setFabric("");
        setColor("");
        setTechnique("");
        onFilterChange({
            priceRange: [0, 200000],
            fabric: "",
            color: "",
            technique: "",
        });
    };

    const FilterSection = ({ title, isOpen, onToggle, children }) => (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <span className="font-medium text-foreground">{title}</span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-foreground" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-foreground" />
                )}
            </button>
            {isOpen && <div className="p-4 bg-white">{children}</div>}
        </div>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-foreground bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform duration-300 shadow-xl lg:relative lg:translate-x-0 lg:w-72 lg:shadow-none lg:border-r lg:border-gray-200 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-foreground" />
                        <h3 className="text-lg font-semibold text-foreground">
                            Filters
                            {activeFilters > 0 && (
                                <span className="ml-2 bg-foreground text-white text-xs px-2 py-1 rounded-full">
                                    {activeFilters}
                                </span>
                            )}
                        </h3>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-1 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        <X className="w-5 h-5 text-foreground" />
                    </button>
                </div>

                {/* Filter Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Price Range Filter */}
                    <FilterSection
                        title="Price Range"
                        isOpen={openSections.price}
                        onToggle={() => toggleSection("price")}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-foreground mb-1">
                                        Min Price
                                    </label>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) =>
                                            setPriceRange([
                                                Number(e.target.value),
                                                priceRange[1],
                                            ])
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent text-sm transition-all duration-200"
                                        placeholder="₹0"
                                    />
                                </div>
                                <div className="text-foreground mt-6">-</div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-foreground mb-1">
                                        Max Price
                                    </label>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) =>
                                            setPriceRange([
                                                priceRange[0],
                                                Number(e.target.value),
                                            ])
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent text-sm transition-all duration-200"
                                        placeholder="₹10,000"
                                    />
                                </div>
                            </div>

                            {/* Price Range Slider */}
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="200000"
                                    step="100"
                                    value={priceRange[0]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            Number(e.target.value),
                                            priceRange[1],
                                        ])
                                    }
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="200000"
                                    step="100"
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            priceRange[0],
                                            Number(e.target.value),
                                        ])
                                    }
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                            </div>

                            <div className="flex justify-between text-sm text-foreground">
                                <span>₹{priceRange[0].toLocaleString()}</span>
                                <span>₹{priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </FilterSection>

                    {/* Fabric Filter */}
                    <FilterSection
                        title="Fabric"
                        isOpen={openSections.fabric}
                        onToggle={() => toggleSection("fabric")}
                    >
                        <div className="space-y-2">
                            {[
                                "All Fabrics",
                                "Silk",
                                "Cotton",
                                "Georgette",
                                "Chiffon",
                                "Linen",
                            ].map((fabricOption) => (
                                <label
                                    key={fabricOption}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="fabric"
                                        value={
                                            fabricOption === "All Fabrics"
                                                ? ""
                                                : fabricOption
                                        }
                                        checked={
                                            fabric ===
                                            (fabricOption === "All Fabrics"
                                                ? ""
                                                : fabricOption)
                                        }
                                        onChange={(e) =>
                                            setFabric(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-foreground">
                                        {fabricOption}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Color Filter */}
                    <FilterSection
                        title="Color"
                        isOpen={openSections.color}
                        onToggle={() => toggleSection("color")}
                    >
                        <div className="space-y-2">
                            {[
                                "All Colors",
                                "Black",
                                "White",
                                "Red",
                                "Blue",
                                "Green",
                                "Yellow",
                                "Pink",
                            ].map((colorOption) => (
                                <label
                                    key={colorOption}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="color"
                                        value={
                                            colorOption === "All Colors"
                                                ? ""
                                                : colorOption
                                        }
                                        checked={
                                            color ===
                                            (colorOption === "All Colors"
                                                ? ""
                                                : colorOption)
                                        }
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <div className="flex items-center gap-2">
                                        {colorOption !== "All Colors" && (
                                            <div
                                                className="w-4 h-4 rounded-full border border-gray-300"
                                                style={{
                                                    backgroundColor:
                                                        colorOption.toLowerCase(),
                                                }}
                                            />
                                        )}
                                        <span className="text-sm text-gray-700">
                                            {colorOption}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Technique Filter */}
                    <FilterSection
                        title="Technique"
                        isOpen={openSections.technique}
                        onToggle={() => toggleSection("technique")}
                    >
                        <div className="space-y-2">
                            {[
                                "All Techniques",
                                "Handwoven",
                                "Embroidered",
                                "Printed",
                                "Block Print",
                                "Digital Print",
                            ].map((techniqueOption) => (
                                <label
                                    key={techniqueOption}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="technique"
                                        value={
                                            techniqueOption === "All Techniques"
                                                ? ""
                                                : techniqueOption
                                        }
                                        checked={
                                            technique ===
                                            (techniqueOption ===
                                            "All Techniques"
                                                ? ""
                                                : techniqueOption)
                                        }
                                        onChange={(e) =>
                                            setTechnique(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {techniqueOption}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="space-y-3">
                        <button
                            onClick={handleApplyFilters}
                            className="w-full bg-foreground text-white py-3 px-4 rounded-lg hover:bg-foreground transition-colors font-medium"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={handleClearFilters}
                            className="w-full bg-white text-foreground py-3 px-4 rounded-lg border border-foreground hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Clear All Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SidebarFilter;
