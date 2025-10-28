<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class UserController extends Controller
{
      /**
     * @OA\Get(
     *     path="/api/user/getusers",
     *     summary="Lista usuários com paginação e filtros",
     *     description="Retorna uma lista paginada de usuários. Permite busca por nome ou matrícula e filtro por status ativo.",
     *     tags={"Usuários"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Texto para busca por nome ou matrícula",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="is_active",
     *         in="query",
     *         description="Filtra usuários ativos/inativos (true/false)",
     *         required=false,
     *         @OA\Schema(type="boolean")
     *     ),
     *     @OA\Response(response=200, description="Lista de usuários retornada com sucesso"),
     *     @OA\Response(response=500, description="Erro ao buscar usuários")
     * )
     */
    public function getUsers(Request $request)
    {
        try {
            $query = User::query();

            if ($search = $request->get('search')) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('registration', 'like', "%{$search}%");
                });
            }

            if ($request->has('is_active')) {
                $query->where('is_active', $request->boolean('is_active'));
            }

            $users = $query->orderBy('name')->paginate(10);

            return response()->json($users);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao buscar usuários',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/user/createuser",
     *     summary="Cria um novo usuário",
     *     description="Cria um novo registro de usuário com nome, matrícula e senha.",
     *     tags={"Usuários"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "registration", "password"},
     *             @OA\Property(property="name", type="string", example="João da Silva"),
     *             @OA\Property(property="registration", type="string", example="2025001"),
     *             @OA\Property(property="password", type="string", example="123456"),
     *             @OA\Property(property="role", type="string", example="user")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Usuário criado com sucesso"),
     *     @OA\Response(response=500, description="Erro ao criar usuário")
     * )
     */
    public function createUser(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'registration' => 'required|string|max:50|unique:users,registration',
                'password' => 'required|string|min:6',
                'role' => ['nullable', Rule::in(['admin', 'user'])],
            ]);

            $user = User::create([
                'name' => $validated['name'],
                'registration' => $validated['registration'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'] ?? 'user',
            ]);

            return response()->json([
                'message' => 'Usuário criado com sucesso',
                'data' => $user,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao criar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/user/finduser/{id}",
     *     summary="Busca um usuário específico",
     *     description="Retorna os dados de um usuário pelo ID.",
     *     tags={"Usuários"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do usuário",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Usuário encontrado"),
     *     @OA\Response(response=404, description="Usuário não encontrado")
     * )
     */
    public function findUser($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao buscar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/user/edituser/{id}",
     *     summary="Edita um usuário existente",
     *     description="Atualiza dados de um usuário (nome, matrícula, senha, status).",
     *     tags={"Usuários"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do usuário",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Maria Souza"),
     *             @OA\Property(property="registration", type="string", example="2025002"),
     *             @OA\Property(property="password", type="string", example="novaSenha123"),
     *             @OA\Property(property="role", type="string", example="admin"),
     *             @OA\Property(property="is_active", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Usuário atualizado com sucesso"),
     *     @OA\Response(response=404, description="Usuário não encontrado")
     * )
     */
    public function editUser(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'registration' => [
                    'sometimes',
                    'required',
                    'string',
                    'max:50',
                    Rule::unique('users')->ignore($user->id),
                ],
                'password' => 'nullable|string|min:6',
                'role' => ['nullable', Rule::in(['admin', 'user'])],
                'is_active' => 'nullable|boolean',
            ]);

            if (!empty($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            } else {
                unset($validated['password']);
            }

            $user->update($validated);

            return response()->json([
                'message' => 'Usuário atualizado com sucesso',
                'data' => $user,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Patch(
     *     path="/api/user/toggleactiveuser/{id}",
     *     summary="Ativa ou desativa um usuário",
     *     description="Alterna o campo is_active de um usuário.",
     *     tags={"Usuários"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do usuário",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Status do usuário alterado com sucesso"),
     *     @OA\Response(response=404, description="Usuário não encontrado")
     * )
     */
    public function toggleActiveUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->is_active = !$user->is_active;
            $user->save();

            return response()->json([
                'message' => $user->is_active ? 'Usuário ativado' : 'Usuário desativado',
                'data' => $user,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao alterar status do usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/user/deleteuser/{id}",
     *     summary="Exclui um usuário",
     *     description="Remove permanentemente um usuário do sistema.",
     *     tags={"Usuários"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do usuário",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Usuário excluído com sucesso"),
     *     @OA\Response(response=404, description="Usuário não encontrado")
     * )
     */
    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json(['message' => 'Usuário excluído com sucesso']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao excluir usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
