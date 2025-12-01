<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceRequest;

/**
 * @OA\Schema(
 *     schema="ServiceRequest",
 *     required={"pushName", "numero", "status", "topic"},
 *     @OA\Property(property="id", type="integer", example=1, readOnly=true),
 *     @OA\Property(property="pushName", type="string", example="João Silva"),
 *     @OA\Property(property="numero", type="string", example="5581999999999"),
 *     @OA\Property(
 *         property="status",
 *         type="string",
 *         enum={"waiting", "in service"},
 *         example="waiting"
 *     ),
 *     @OA\Property(property="topic", type="string", example="Dúvida sobre atendimento"),
 *     @OA\Property(
 *         property="conversationSummary",
 *         type="string",
 *         nullable=true,
 *         example="Cliente perguntou sobre tempo de espera."
 *     ),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 *
 * @OA\Tag(
 *     name="Service Requests",
 *     description="Gerenciamento das solicitações de atendimento"
 * )
 */

class ServiceRequestController extends Controller
{
     /**
     * Listar todas as solicitações.
     *
     * @OA\Get(
     *     path="/api/ServiceRequest/get",
     *     tags={"Service Requests"},
     *     summary="Lista todas as solicitações de serviço",
     *     @OA\Response(
     *         response=200,
     *         description="Lista de solicitações retornada com sucesso",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/ServiceRequest")
     *         )
     *     )
     * )
     */
    public function index()
    {
        // Lista todos os registros
        return response()->json(ServiceRequest::all());
    }


    
    /**
     * Criar uma nova solicitação.
     *
     * @OA\Post(
     *     path="/api/ServiceRequest/create",
     *     tags={"Service Requests"},
     *     summary="Cria uma nova solicitação de serviço",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"pushName", "numero", "status", "topic"},
     *             @OA\Property(property="pushName", type="string", example="João Silva"),
     *             @OA\Property(property="numero", type="string", example="5581999999999"),
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 enum={"waiting", "in service"},
     *                 example="waiting"
     *             ),
     *             @OA\Property(property="topic", type="string", example="Dúvida sobre atendimento"),
     *             @OA\Property(
     *                 property="conversationSummary",
     *                 type="string",
     *                 nullable=true,
     *                 example="Resumo inicial da conversa."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Solicitação criada com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/ServiceRequest")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */

    public function store(Request $request)
    {
        $data = $request->validate([
            'pushName'            => 'required|string|max:255',
            'numero'              => 'required|string|max:255',
            'status'              => 'required|in:waiting,in service',
            'topic'               => 'required|string|max:255',
            'conversationSummary' => 'nullable|string',
        ]);

        $serviceRequest = ServiceRequest::create($data);

        return response()->json($serviceRequest, 201);
    }

    /**
     * Atualizar apenas o status de uma solicitação.
     *
     * @OA\Patch(
     *     path="/api/ServiceRequest/updateStatus{serviceRequest}",
     *     tags={"Service Requests"},
     *     summary="Atualiza o status de uma solicitação de serviço",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID da solicitação",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"status"},
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 enum={"waiting", "in service"},
     *                 example="in service"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Status atualizado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/ServiceRequest")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Solicitação não encontrada"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */

    public function updateStatus(Request $request, ServiceRequest $serviceRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:waiting,in service',
        ]);

        $serviceRequest->update([
            'status' => $validated['status'],
        ]);

        return response()->json($serviceRequest);
    }
}
