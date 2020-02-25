<template>
  <div class="evaluations">
    <h2 class="evaluations_subtitle">
      Avaliações
    </h2>
    <ul>
      <li
        v-for="evaluation in evaluations"
        :key="evaluation.id"
        class="evaluation"
      >
        <p class="evaluation_description">
          {{ evaluation.description }}
        </p>
        <p class="evaluation_user">
          {{ evaluation.name }} | {{ evaluation.stars }} estrelas
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Evaluations',
  props: {
    evaluations: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.evaluations {
  grid-column: 2;
}

.evaluations_subtitle {
  font-size: 1.75rem;
}

.evaluation {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}

.evaluation_description {
  color: rgba(0, 0, 0, 0.7);
  margin: 20px 0 5px 0;
}

.evaluation_user {
  font-weight: bold;
}
</style>
