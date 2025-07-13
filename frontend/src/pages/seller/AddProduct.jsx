import { assets, categories } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios, fetchProducts } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);

      // Only append files that are not null/undefined
      files.forEach((file, index) => {
        if (file && file instanceof File) {
          formData.append("image", file);
        }
      });

      const { data } = await axios.post("/api/product/add-product", formData);
      if (data.success) {
        await fetchProducts();
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = null;
    setFiles(updatedFiles);
  };

  const calculateDiscount = () => {
    if (price && offerPrice) {
      const discount = ((price - offerPrice) / price * 100).toFixed(0);
      return discount > 0 ? discount : 0;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600">Create a new product listing for your store</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
              <span className="text-sm text-gray-500">(Upload up to 4 images)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {Array(4).fill("").map((_, index) => (
                <div key={index} className="relative group">
                  <label htmlFor={`image${index}`} className="block">
                    <input
                      onChange={(e) => {
                        const updatedFiles = [...files];
                        updatedFiles[index] = e.target.files[0] || null;
                        setFiles(updatedFiles);
                      }}
                      accept="image/*"
                      type="file"
                      id={`image${index}`}
                      hidden
                    />
                    <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors cursor-pointer flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-green-50">
                      {files[index] && files[index] instanceof File ? (
                        <img
                          className="w-full h-full object-cover"
                          src={URL.createObjectURL(files[index])}
                          alt={`Product ${index + 1}`}
                        />
                      ) : (
                        <div className="text-center">
                          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p className="text-xs text-gray-500">Upload Image</p>
                        </div>
                      )}
                    </div>
                  </label>
                  {files[index] && files[index] instanceof File && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="product-name">
                  Product Name *
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option value={cat.path} key={index}>
                      {cat.text}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="product-price">
                    Original Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                    <input
                      id="product-price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="offer-price">
                    Offer Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                    <input
                      id="offer-price"
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Discount Display */}
              {calculateDiscount() > 0 && (
                <div className="lg:col-span-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-green-800 font-medium">
                        {calculateDiscount()}% discount applied
                      </span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Customers save ₹{(price - offerPrice).toFixed(2)} on this product
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="product-description">
                  Product Description
                </label>
                <textarea
                  id="product-description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-none"
                  placeholder="Enter detailed product description..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  {description.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                onClick={() => {
                  setName("");
                  setDescription("");
                  setCategory("");
                  setPrice("");
                  setOfferPrice("");
                  setFiles([]);
                }}
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors font-medium flex items-center gap-2 min-w-[140px] justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Product
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
