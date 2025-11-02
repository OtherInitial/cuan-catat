<div>
  <canvas id="realtimeChart1"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    var ctx = document.getElementById('realtimeChart1').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ampere (A)',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var updateChart = function() {
    $.ajax({
      url: "{{ route('api.chart') }}",
      type: 'GET',
      dataType: 'json',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function(data) {
        myChart.data.labels = data.labels;
        myChart.data.datasets[0].data = data.data;
        myChart.update();
      },
      error: function(data){
        console.log(data);
      }
    });
  }

updateChart();
setInterval(function() {
  updateChart();
}, 1000);

</script>