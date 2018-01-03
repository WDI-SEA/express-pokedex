<div class="pokemon">
    <div class = "image-box">
    <img src="<%= sprites.front_default%>">
    <img src="<%= sprites.back_default%>">
    <img src="<%= sprites.front_shiny%>">
    <img src="<%= sprites.back_shiny%>">
    </div>
    <h1 id="pokemon-name" class="title name <%= types[0].type.name%>"
    data-secondtype="
        <% if (types[1]) { %>
              <%=types[1].type.name%>
        <%}%>
    "><%= species.name %></h1>

    <p>Types: <%= typesCommaSeparated %></p>
  <p>Abilities: <%= abilitiesCommaSeparated%></p>

<a href='/pokemon'>Back to Favorites</a>
</div>
