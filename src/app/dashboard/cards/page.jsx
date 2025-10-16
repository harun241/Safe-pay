"use client";

import { useState, useEffect } from "react";
import CardTable from "../_components/CardTable";
import CardFormModal from "../_components/CardFormModal";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";

export default function CardsPage() {
    const { user } = useAuth();
    const { theme } = useTheme();

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editCard, setEditCard] = useState(null);

    // Fetch cards
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await fetch(`/api/cards?uid=${user?.uid}`);
                const data = await res.json();
                setCards(data.cards || []);
            } catch (err) {
                console.error("Failed to fetch cards:", err);
            } finally {
                setLoading(false);
            }
        };
        if (user?.uid) fetchCards();
    }, [user?.uid]);

    const handleAddCard = () => {
        setEditCard(null);
        setModalOpen(true);
    };

    const handleEditCard = (card) => {
        setEditCard(card);
        setModalOpen(true);
    };

    const handleDeleteCard = async (cardId) => {
        if (!confirm("Are you sure you want to delete this card?")) return;
        try {
            const res = await fetch(`/api/cards/${cardId}`, { method: "DELETE" });
            if (res.ok) setCards(cards.filter((c) => c.id !== cardId));
        } catch (err) {
            console.error("Failed to delete card:", err);
        }
    };

    return (
        <div className={`flex flex-col gap-6 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Cards</h1>
                <button
                    onClick={handleAddCard}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition"
                >
                    Add Card
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div
                        className={`w-12 h-12 border-4 rounded-full animate-spin ${theme === "dark" ? "border-t-cyan-400 border-gray-700" : "border-t-green-500 border-gray-300"
                            }`}
                    />
                </div>
            ) : (
                <CardTable
                    cards={cards}
                    theme={theme}
                    onEdit={handleEditCard}
                    onDelete={handleDeleteCard}
                />
            )}

            {modalOpen && (
                <CardFormModal
                    theme={theme}
                    card={editCard}
                    onClose={() => setModalOpen(false)}
                    onSave={(newCard) => {
                        if (editCard) {
                            setCards(cards.map((c) => (c.id === newCard.id ? newCard : c)));
                        } else {
                            setCards([newCard, ...cards]);
                        }
                        setModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}
