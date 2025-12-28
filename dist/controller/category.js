import { getCategories } from "../repository/category.js";
import ApiError from "../common/apieError.js";
import ApiResponse from "../common/apiResponse.js";
import connectDB from "../db/connection.js";
const getCategoriesController = async (req, res) => {
    try {
        await connectDB();
        let response = await getCategories();
        return res.status(200).json(new ApiResponse(response));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError("error occures on server"));
    }
};
export { getCategoriesController };
