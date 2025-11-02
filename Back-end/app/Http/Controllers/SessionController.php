<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
class SessionController extends Controller
{
    //
         #getSession
    /**
     * @OA\Get(
     *     path="/api/session",
     *     summary="List Sessions",
     *     tags={"Sessions"},
     *     @OA\Response(
     *         response=200,
     *         description="Paged list of Sessions"
     *     )
     * )
     */
        public function getSessions()
    {
        return Session::all();
    }
    public function createSession(Request $request)
    {
      try {
            // Validação dos dados recebidos
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'expires_at' => 'nullable|date',
                'last_activity_at' => 'nullable|date',
            ]);

            // Criação da sessão
            $session = Session::create([
                'user_id' => $validated['user_id'],
                'expires_at' => $validated['expires_at'] ?? now()->addHours(2),
                'last_activity_at' => $validated['last_activity_at'] ?? now(),
                'revoked' => false,
            ]);

            return response()->json([
                'message' => 'Sessão criada com sucesso!',
                'data' => $session
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            Log::error('Erro ao criar sessão: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erro interno ao criar sessão.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    
}
