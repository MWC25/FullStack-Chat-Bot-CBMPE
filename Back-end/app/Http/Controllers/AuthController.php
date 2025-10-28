<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    //
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="User Login",
     *     description="Endpoint for user authentication. Requires registration and password.",
     *     operationId="loginUser",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"registration", "password"},
     *             @OA\Property(property="registration", type="string", format="registration", example="user123"),
     *             @OA\Property(property="password", type="string", format="password", example="secret123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User authenticated successfully"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="registration was not provided | The user's registration must be of the type String | password was not provided"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Invalid credentials"
     *     )
     * )
     */
    public function login(Request $request)
    {
        $valid = $request->validate([
            'registration' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = [
            "registration" => $valid["registration"],
            "password" => $valid["password"]
        ];

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]); 
    }

    /**
 * @OA\Post(
 *     path="/api/logout",
 *     summary="Logout do usuário autenticado",
 *     description="Encerra a sessão do usuário autenticado removendo o token de acesso atual (Sanctum).",
 *     tags={"Authentication"},
 *     security={{"sanctum": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="Logout realizado com sucesso",
 *         @OA\JsonContent(
 *             example={"message": "Logged out"}
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Nenhum token encontrado para exclusão",
 *         @OA\JsonContent(
 *             example={"message": "No token found"}
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Usuário não autenticado",
 *         @OA\JsonContent(
 *             example={"message": "Not authenticated"}
 *         )
 *     )
 * )
 */
    public function logout(Request $request)
    {
      $user = $request->user();

    if (!$user) {
        return response()->json(['message' => 'Not authenticated'], 401);
    }

    $token = $user->currentAccessToken();

    if ($token) {
        $token->delete();
        return response()->json(['message' => 'Logged out']);
    }

    return response()->json(['message' => 'No token found'], 400);
}
}
