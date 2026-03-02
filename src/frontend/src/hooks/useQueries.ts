import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Order, OrderItem } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.get_all_orders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOrderById(orderId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      return actor.get_order_by_id(BigInt(orderId));
    },
    enabled: !!actor && !isFetching && !!orderId,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerName,
      phone,
      address,
      items,
      totalAmount,
      paymentMethod,
      upiTransactionRef,
    }: {
      customerName: string;
      phone: string;
      address: string;
      items: OrderItem[];
      totalAmount: bigint;
      paymentMethod: string;
      upiTransactionRef: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.place_order(
        customerName,
        phone,
        address,
        items,
        totalAmount,
        paymentMethod,
        upiTransactionRef,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      newStatus,
    }: {
      orderId: bigint;
      newStatus: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.update_order_status(orderId, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
