import { useState, useEffect } from "react";
import { useGenericContext } from "../../contexts/GenericContext";
import "./styles.scss";

/* Funções que podem ser usadas externas ao arquivo */

// Roteia para página de registro
export const goRegistration = (navigate, routeName) => {
  navigate(`/${routeName}/novo`);
};

// Roteia para página de visualização
export const goView = (navigate, routeName, id) => {
  navigate(`/${routeName}/${id}`);
};

// Roteia para página de edição
export const goEdit = (navigate, routeName, id) => {
  navigate(`/${routeName}/${id}/editar`);
};

function Table({
  headerComponent, // componentes acima do cabeçalho da tabela, relacionados a ações
  headerCells, // descrições do cabeçalho da tabela
  getRowProps, // propriedades para quando clica em uma linha
  visualize, // caso haja um modal
  children, // formatação de linha
}) {
  const { storageObject } = useGenericContext();
  const [filteredElements, setfilteredElements] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 30;
  const [selectedId, setSelectedId] = useState(null);

  // Função para pesquisa de registro
  useEffect(() => {
    let result = [...storageObject];
    if (search.trim() !== "") {
      result = result.filter((element) =>
        element.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    setfilteredElements(result.slice(0, offset + limit));
  }, [search, storageObject, offset]);

  // Função para Scroll
  useEffect(() => {
    const handleScroll = () => {
      const table = document.querySelector(".table-container");
      if (!table) return;
      if (window.innerHeight + window.scrollY >= table.offsetHeight - 100) {
        if (filteredElements.length < storageObject.length) {
          handleLoadMore();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredElements, storageObject]);
  const handleLoadMore = () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        {typeof headerComponent === "function"
          ? headerComponent({ search, setSearch })
          : headerComponent}
      </div>
      <table className="table">
        <thead>
          <tr>
            {headerCells.map((hC, idx) => (
              <th key={idx}>{hC}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredElements.map((element) => (
            <tr
              key={element.id}
              {...(getRowProps ? getRowProps({ element, selectedId, setSelectedId }) : {})}
            >
              {typeof children === "function" ? children(element) : children}
            </tr>
          ))}
          {filteredElements.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Nenhum elemento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Exibição do Modal (fora da tabela)*/}
      {typeof visualize === "function"
        ? visualize({ selectedId, setSelectedId })
        : visualize}
    </div>
  );
}

export default Table;
