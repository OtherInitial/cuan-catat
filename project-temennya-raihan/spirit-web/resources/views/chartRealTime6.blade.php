<div>
  <canvas id="realtimeChart6"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    var ctx6 = document.getElementById('realtimeChart6').getContext('2d');
    var myChart6 = new Chart(ctx6, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ampere (A)',
                data: [],
                backgroundColor: '#75A47F',
                borderColor: '#75A47F',
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

    var updateChart6 = function() {
    $.ajax({
      url: "{{ route('api.chart6') }}",
      type: 'GET',
      dataType: 'json',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function(data) {
        myChart6.data.labels = data.labels;
        myChart6.data.datasets[0].data = data.data;
        myChart6.update();
      },
      error: function(data){
        console.log(data);
      }
    });
  }

updateChart6();
setInterval(function() {
  updateChart6();
}, 1000);

</script>