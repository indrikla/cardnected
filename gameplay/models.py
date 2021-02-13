from django.db import models

# Create your models here.
class DigDeeper1(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'DigDeeper1'

    def __str__(self):
        return self.question

class DigDeeper2(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'DigDeeper2'

    def __str__(self):
        return self.question

class DigDeeper3(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'DigDeeper3'

    def __str__(self):
        return self.question

class IceBreak(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'IceBreak'

    def __str__(self):
        return self.question

class Perspective(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'Perspective'

    def __str__(self):
        return self.question

class Lovebirds(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'Lovebirds'

    def __str__(self):
        return self.question

class Stranger(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'Stranger'

    def __str__(self):
        return self.question

class MixNMatch(models.Model):
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'MixNMatch'

    def __str__(self):
        return self.question

# class Report(models.Model):
#     pack = models.TextField('Card Pack', max_length=100, null=True, blank=False)
#     question = models.TextField('Question', max_length=500, null=True, blank=False)


#     class Meta:
#         db_table = 'Report'

#     def __str__(self):
#         return "Report of " + self.question + " on " + self.pack + " pack."


# class Player(models.Model):
#     numberOfPlayer = models.IntegerField('Number of Players', default=2)
#     if numberOfPlayer == 2 :
#         firstPlayer = models.TextField('Player 1', max_length=100, null=True, blank=False)
#         secondPlayer = models.TextField('Player 2', max_length=100, null=True, blank=False)
#     pack = models.CharField('Card Pack', 
#         max_length=120, null=True, blank=False,
#         choices = CARDPACK_CHOICES, 
#         )
#     if pack == "Dig Deeper" :
#         level = models.IntegerField('Number of Players', default=1,
#         validators=[
#                 MaxValueValidator(3),
#                 MinValueValidator(1)
#             ]
#         )
     
#     class Meta:
#         db_table = 'player'

#     def __str__(self):
#         return self.question
