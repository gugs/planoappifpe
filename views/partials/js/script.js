<script>

                function listaIDELementosTabela() {
                    var disciplinasId = [];
                    var size = document.getElementById("itensSelecionados").rows.length;
                    var x;
                    for (var i = 1; i < size; i++) {
                        x = document.getElementById("itensSelecionados").rows[i].cells[0].innerHTML;
                        disciplinasId.unshift(x);
                    }
                    console.log(disciplinasId);
                }

                function containItemTabela(a) {
                    var disciplinasId = [];
                    var size = document.getElementById("itensSelecionados").rows.length;
                    var x;
                    for (var i = 1; i < size; i++) {
                        x = document.getElementById("itensSelecionados").rows[i].cells[0].innerHTML;
                        disciplinasId.unshift(x);
                    }
                    return disciplinasId.includes(a);
                }

                function retrieveOnComboList() {

                    var disciplinesLocal = [];
                    var discipline;

                    console.log(<%= disciplinas.length %>);
                    console.log(<%= planodisciplinas.length %>);

                    
                    
                        <% planodisciplinas.forEach(planodisciplina => { %>
                        <% disciplinas.forEach(disciplina => { %>
                        <% if (planodisciplina.disciplinaId === disciplina.id) { %>
                            discipline = {
                                "id": "<%= disciplina.id %>",
                                    "nome": "<%= disciplina.nome %>",
                                        "chaula": "<%= disciplina.cargaHorariaAula %>",
                                            "chrelogio": "<%= disciplina.cargaHorariaRelogio %>",
                                                "tipo": "<%= disciplina.tipo %>",
                                            }
                            disciplinesLocal.unshift(discipline);
                            console.log(discipline);
                        <% } %>
                    <% }); %>
                    <% }); %>
                    
                    var tabela = document.getElementById("itensSelecionados").getElementsByTagName('tbody')[0];

                    disciplinesLocal.forEach(d => {
                        var row = tabela.insertRow(0);
                        row.setAttribute("name", "selecaodisciplinas");
                        row.setAttribute("value", d.id);
                        row.setAttribute("type", "input");
                        var cellId = row.insertCell(0);
                        var cellNome = row.insertCell(1);
                        var cellAula = row.insertCell(2);
                        var cellRelogio = row.insertCell(3);
                        var cellTipo = row.insertCell(4);
                        var cellOpcao = row.insertCell(5);
                        var cellHidden = row.insertCell(6);
                        var deleteLink = document.createElement("a");
                        var input = document.createElement("input");
                        input.setAttribute("name", "selecaodisciplinas");
                        input.setAttribute("value", d.id);
                        input.setAttribute("type", "hidden");
                        
                        row.id = d.id * 10;
                        cellId.innerHTML = d.id;
                        cellNome.innerHTML = d.nome;
                        cellAula.innerHTML = d.chaula;
                        cellRelogio.innerHTML = d.chrelogio;
                        cellTipo.innerHTML = d.tipo;
                        cellOpcao.appendChild(deleteLink);
                        cellHidden.appendChild(input);

                    });
                }

                function containItemTabelaEx(a) {
                    var extensoesId = [];
                    var size = document.getElementById("itensSelecionadosEx").rows.length;
                    var x;
                    for (var i = 1; i < size; i++) {
                        x = document.getElementById("itensSelecionadosEx").rows[i].cells[0].innerHTML;
                        extensoesId.unshift(x);
                    }
                    return extensoesId.includes(a);
                }

                function retrieveExOnComboList() {

                    var extensionesLocal = [];
                    var extensiones;

<% planosextensao.forEach(planoextensao => { %>
<% extensoes.forEach(ext => { %>
<% if (planoextensao.extensoId === ext.id) { %>
                            extensiones = {
                                "id": "<%= ext.id %>",
                                    "titulo": "<%= ext.titulo %>",
                                        "coordenador": "<%= ext.docente.nome%>",
                                            "inicio": "<%= ext.anoinicio %>",
                                                "fim": "<%= ext.anofim %>",
                                                    "prorrogado": "<%= ext.prorrogado %>",
                                                        "ch": "<%= ext.cargahoraria %>",
}
                            extensionesLocal.unshift(extensiones);
    <% } %>
<% }); %>
<% }); %>

                        console.log(extensionesLocal);

                    var tabela = document.getElementById("itensSelecionadosEx").getElementsByTagName('tbody')[0];

                    extensionesLocal.forEach(d => {
                        var row = tabela.insertRow(0);
                        row.setAttribute("name", "selecaoextensao");
                        row.setAttribute("value", d.id);
                        row.setAttribute("type", "input");
                        var cellId = row.insertCell(0);
                        var cellTitulo = row.insertCell(1);
                        var cellCoordenador = row.insertCell(2);
                        var cellInicio = row.insertCell(3);
                        var cellFim = row.insertCell(4);
                        var cellProrrogado = row.insertCell(5);
                        var cellCH = row.insertCell(6);
                        var cellOpcao = row.insertCell(7);
                        var cellHidden = row.insertCell(8);
                        var deleteLink = document.createElement("a");
                        var input = document.createElement("input");
                        input.setAttribute("name", "selecaoextensao");
                        input.setAttribute("value", d.id);
                        input.setAttribute("type", "hidden");
                        
                        row.id = d.id * 10;
                        cellId.innerHTML = d.id;
                        cellTitulo.innerHTML = d.titulo;
                        cellCoordenador.innerHTML = d.coordenador;
                        cellInicio.innerHTML = d.inicio;
                        cellFim.innerHTML = d.fim;
                        cellProrrogado.innerHTML = d.prorrogado;
                        cellCH.innerHTML = d.ch;

                        cellOpcao.appendChild(deleteLink);
                        cellHidden.appendChild(input);

                    });
                }


                function confirmarDelecao(event, form) {
                    event.preventDefault();
                    var decision = confirm("Você deseja deletar o registro?");
                    if (decision) { form.submit(); }
                }


            </script>