<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Business;
class BusinessController extends Controller
{
    
        #getBusiness
    /**
     * @OA\Get(
     *     path="/api/business/getbusiness",
     *     summary="List Business",
     *     tags={"Business"},
     *     @OA\Response(
     *         response=200,
     *         description="Paged list of Business"
     *     )
     * )
     */
        public function getBusiness()
    {
        return Business::all();
    }
    
    /**
     * @OA\Post(
     *     path="/api/business/createbusiness",
     *     summary="Create a new business",
     *     description="Register a new business by providing its name and CNPJ.",
     *     tags={"Business"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name_business", "cnpj"},
     *             @OA\Property(property="name_business", type="string", example="Acme Corporation"),
     *             @OA\Property(property="cnpj", type="string", example="12345678000199")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Business successfully created",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Business created successfully"),
     *             @OA\Property(property="business", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name_business", type="string", example="Acme Corporation"),
     *                 @OA\Property(property="cnpj", type="string", example="12345678000199"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-10-27T18:55:00.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-10-27T18:55:00.000000Z")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="CNPJ already exists",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="CNPJ already exists")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(property="errors", type="object",
     *                 @OA\Property(property="cnpj", type="array", @OA\Items(type="string", example="The cnpj field must be 14 characters."))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Error creating business"),
     *             @OA\Property(property="error", type="string", example="SQLSTATE[23000]: Integrity constraint violation...")
     *         )
     *     )
     * )
     */
   public function createBusiness(Request $request){
    try {
        
        $data = $request->validate([
            'name_business' => 'required|string|max:255',
            'cnpj' => 'required|string|size:14',
        ]);

       
        $existingBusiness = Business::where('cnpj', $data['cnpj'])->first();

        if ($existingBusiness) {
            return response()->json([
                'message' => 'CNPJ already exists',
                'business' => $existingBusiness
            ], 409);
        }

   
        $business = Business::create($data);

        return response()->json([
            'message' => 'Business created successfully',
            'business' => $business
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error creating business',
            'error' => $e->getMessage(),
        ], 500);
    }
    }    
    /**
 * @OA\Put(
 *     path="/api/business/updatebusiness/{id}",
 *     summary="Update a business",
 *     description="Update the name or CNPJ of a business.",
 *     tags={"Business"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the business to update",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="name_business", type="string", example="Updated Company"),
 *             @OA\Property(property="cnpj", type="string", example="12345678000199")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Business successfully updated",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Business updated successfully"),
 *             @OA\Property(property="business", type="object")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Business not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Business not found")
 *         )
 *     )
 * )
 */
public function updateBusiness(Request $request, $id)
{
    $business = Business::find($id);

    if (!$business) {
        return response()->json(['message' => 'Business not found'], 404);
    }

    $data = $request->validate([
        'name_business' => 'sometimes|required|string|max:255',
        'cnpj' => 'sometimes|required|string|size:14',
    ]);

    $business->update($data);

    return response()->json([
        'message' => 'Business updated successfully',
        'business' => $business
    ], 200);
}

/**
 * @OA\Delete(
 *     path="/api/business/deletebusiness/{id}",
 *     summary="Delete a business",
 *     description="Remove a business from the database by ID.",
 *     tags={"Business"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the business to delete",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Business successfully deleted",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Business deleted successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Business not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Business not found")
 *         )
 *     )
 * )
 */
public function deleteBusiness($id)
{
    $business = Business::find($id);

    if (!$business) {
        return response()->json(['message' => 'Business not found'], 404);
    }

    $business->delete();

    return response()->json([
        'message' => 'Business deleted successfully'
    ], 200);
}

}
