import axiosInstance from "../../../../utils/apiConnector";
import productEndpoints from "../../../endpoints/admin/product/product.endpoints";

const productApis = {
    createProduct: async (productData) => {
        const res = await axiosInstance.post(
            productEndpoints.createProduct,
            productData
        );
        return res?.data?.data;
    },
    updateProduct: async (productData, productId) => {
        const res = await axiosInstance.put(
            productEndpoints.updateProduct(productId),
            productData
        );
        return res?.data?.data;
    },
};

export default productApis;
